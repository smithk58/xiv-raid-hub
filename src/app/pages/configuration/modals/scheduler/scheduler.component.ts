import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import parseISO from 'date-fns/parseISO';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time-struct';

// tslint:disable-next-line:max-line-length
import { calculateDaysInWeekMask, WeeklyRaidTime, daysInWeekMaskToBools } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';

import { DaysOfWeek } from 'src/app/shared/DaysUtils';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { finalize } from 'rxjs/operators';

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
    const initialDaysInWeek = raidTime ? daysInWeekMaskToBools(raidTime.weekMask) : undefined;
    const daysOfWeek = new FormArray(
      // Initialize the checkboxes to the existing values if provided otherwise false
      daysOfWeekArr.map((day, index) => new FormControl(initialDaysInWeek ? initialDaysInWeek[index] : false)),
      this.atLeastOneCheckboxCheckedValidator.bind(this)
    );
    let initialTime: NgbTimeStruct;
    if (raidTime) {
      const isoTime = parseISO(raidTime.startTime);
      initialTime = {hour: isoTime.getHours(), minute: isoTime.getMinutes(), second: 0};
    } else {
      initialTime = {hour: 12, minute: 0, second: 0}; // 12pm default
    }
    // Build a group of controls with start/end times, and days of week
    const group = new FormGroup({
      // Initialize start time to existing value if available, otherwise 12pm
      startTime: new FormControl(initialTime, Validators.required),
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
        raidTimes.push({
          raidGroupId: this.raidGroupId,
          startTime: startTime.toISOString(),
          weekMask: calculateDaysInWeekMask(raidTime.daysOfWeek)
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
  // convenience getter for easy access to form fields
  get f() { return this.scheduleForm.controls; }
}
