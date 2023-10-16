import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time-struct';
import { finalize } from 'rxjs/operators';

import {
  calculateDaysInWeekMask,
  WeeklyRaidTime,
  daysInWeekMaskToBools
} from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';

import { DaysOfWeek } from 'src/app/shared/DaysUtils';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  faTrash = faTrashAlt; faPlus = faPlus; faSpinner = faSpinner;
  daysOfWeek = DaysOfWeek;
  @Input() raidGroupId: number;
  @Input() canEdit = true;
  scheduleForm: FormGroup;
  weeklyRaidTimes: FormArray;
  isSubmitted = false;
  timezone: string;
  isLoaded = false;
  constructor(private modal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService,
              private raidGroupService: RaidGroupService, private notify: PNotifyService
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }
  initializeData() {
    // Build schedule form
    this.weeklyRaidTimes = new FormArray([]);
    this.scheduleForm = this.formBuilder.group({
      weeklyRaidTimes: this.weeklyRaidTimes
    });
    this.raidGroupService.getRaidGroupsRaidTimes(this.raidGroupId).pipe(
      finalize(() => {this.isLoaded = true; })
    ).subscribe((raidTimes) => {
      for (const raidTime of raidTimes) {
        this.addWeeklyRaidTime(raidTime);
      }
      if (!this.canEdit) {
        this.scheduleForm.disable();
      }
    }, (error) => {
      this.notify.error({text: 'Failed to get raid times. ' + error});
    });
    // Get the users time zone for display purposes
    this.userService.getUserSession().subscribe((user) => {
      this.timezone = user.prettyTimezone;
    });
  }

  /**
   * Adds a weekly raid time section to the form.
   */
  addWeeklyRaidTime(raidTime?: WeeklyRaidTime) {
    const daysOfWeekArr = Array.from(DaysOfWeek);
    // Build a form array of checkbox inputs
    let initialDaysInWeek: boolean[];
    let initialTime: NgbTimeStruct;
    if (raidTime) {
      // Convert the time to the users local hours/minutes
      const time = new Date();
      time.setUTCHours(raidTime.utcHour);
      time.setUTCMinutes(raidTime.utcMinute);
      time.setUTCSeconds(0);
      initialTime = {hour: time.getHours(), minute: time.getMinutes(), second: 0};
      // Convert the selected days from UTC to local users days
      const utcDaysInWeek = daysInWeekMaskToBools(raidTime.utcWeekMask);
      const shiftDir = this.getDayShiftDirection(time, 'local');
      if (shiftDir) {
        initialDaysInWeek = this.shiftDayBooleanArray(utcDaysInWeek, shiftDir);
      } else {
        initialDaysInWeek = utcDaysInWeek; // no shifting needed, the days already match up to the local users
      }
    } else {
      initialTime = {hour: 12, minute: 0, second: 0}; // 12pm default
    }
    const daysOfWeek = new FormArray(
      // Initialize the checkboxes to the existing values if provided otherwise false
      daysOfWeekArr.map((day, index) => new FormControl(initialDaysInWeek ? initialDaysInWeek[index] : false)),
      this.atLeastOneCheckboxCheckedValidator.bind(this)
    );
    // Build a group of controls with start/end times, and days of week
    const group = new FormGroup({
      // Initialize start time to existing value if available, otherwise 12pm
      startTime: new FormControl(initialTime, [Validators.required, (formControl: FormControl) => {
        const time = formControl.value;
        if (time.minute % 15 !== 0) {
          return {not15Increment: true};
        }
        return null;
      }]),
      daysOfWeek
    });
    this.weeklyRaidTimes.push(group);
  }
  saveSchedule() {
    this.isSubmitted = true;
    if (this.scheduleForm.valid) {
      const raidTimes: WeeklyRaidTime[] = [];
      for (const raidTime of this.weeklyRaidTimes.value) {
        // Convert NgbTimeStruct back to an actual date, so we have timezone information
        const startTime = new Date();
        startTime.setHours(raidTime.startTime.hour);
        startTime.setMinutes(raidTime.startTime.minute);
        startTime.setSeconds(0);
        const dayOfWeek = startTime.getDay();
        const dayOfWeekUTC = startTime.getUTCDay();
        // If the UTC day is different than the users day, then adjust the days array to match UTC days before saving
        let daysOfWeekUtc = raidTime.daysOfWeek;
        const shiftDir = this.getDayShiftDirection(startTime, 'utc');
        if (shiftDir) {
          daysOfWeekUtc = this.shiftDayBooleanArray(raidTime.daysOfWeek, shiftDir);
        }
        raidTimes.push({
          raidGroupId: this.raidGroupId,
          utcHour: startTime.getUTCHours(),
          utcMinute: startTime.getUTCMinutes(),
          utcWeekMask: calculateDaysInWeekMask(daysOfWeekUtc),
          utcTimezoneOffset: startTime.getTimezoneOffset()
        });
      }
      this.modal.close(raidTimes);
    }
  }

  /**
   * Removes the specified weekly raid time.
   * @param index - The index of the raid time to remove.
   */
  removeWeeklyRaidTime(index: number) {
    this.weeklyRaidTimes.removeAt(index);
  }
  atLeastOneCheckboxCheckedValidator(control: FormArray): ValidationErrors | null {
    // At least one child control must be true (checked), otherwise throw 'required' error
    for (const childControl of control.controls) {
      if (childControl.value) {
        return null;
      }
    }
    return {required: true};
  }

  /**
   * Calculates whether you need to shift the days left or right in the days boolean array, depending on if you want the array to be the
   * users local days or UTC days.
   * @param date - A day representing a particular raid time (the date doesn't matter, only the time).
   * @param target - Whether you want to shift the days to local days or UTC.
   */
  getDayShiftDirection(date: Date, target: 'local' | 'utc') {
    const dayOfWeek = date.getDay();
    const dayOfWeekUTC = date.getUTCDay();
    if (dayOfWeekUTC - dayOfWeek === 0) {
      return undefined;
    }
    // If the UTC day is different than the users day then we want to shift; the target should be on the left for calculating diff since
    // we want to shift "forward"(right) a day if the target day of week is larger
    const difference = (target === 'utc') ? (dayOfWeekUTC - dayOfWeek) : (dayOfWeek - dayOfWeekUTC);
    return difference > 0 ? 'right' : 'left';
  }
  /**
   * Shifts the trues in the boolean array left or right to handle local day -> UTC day or vice versa.
   * @param values - An array of booleans.
   * @param shiftDirection - true values will be shifted left/right based on this.
   */
  shiftDayBooleanArray(values: boolean[], shiftDirection: 'left' | 'right') {
    const nValues = [];
    for (let i = 0; i < values.length; i++) {
      let tIdx = shiftDirection === 'left' ? (i - 1) : (i + 1);
      // wrap the index if it under/overflows the array bounds
      if (tIdx < 0) {
        tIdx = values.length - 1;
      } else if (tIdx === values.length) {
        tIdx = 0;
      }
      nValues[tIdx] = values[i];
    }
    return nValues;
  }
  // convenience getter for easy access to form fields
  get f() { return this.scheduleForm.controls; }
}
