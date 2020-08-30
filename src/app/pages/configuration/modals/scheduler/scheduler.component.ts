import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  DaysInWeek,
  CalculateDaysInWeekMask,
  WeeklyRaidTime,
  daysInWeekMaskToBools
} from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  faTrash = faTrashAlt; faPlus = faPlus;
  daysOfWeek = DaysInWeek;
  @Input() raidTimes: WeeklyRaidTime[];
  scheduleForm: FormGroup;
  weeklyRaidTimes: FormArray;
  isSubmitted = false;
  constructor(private modal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Build schedule form
    this.weeklyRaidTimes = new FormArray([]);
    this.scheduleForm = this.formBuilder.group({
      weeklyRaidTimes: this.weeklyRaidTimes
    });
    // Add initial raid times if provided
    if (this.raidTimes) {
      for (const raidTime of this.raidTimes) {
        this.addWeeklyRaidTime(raidTime);
      }
    }
  }

  /**
   * Adds a weekly raid time section to the form.
   */
  addWeeklyRaidTime(raidTime?: WeeklyRaidTime) {
    const initialValues = raidTime ? daysInWeekMaskToBools(raidTime.weekMask) : undefined;
    // Build a form array of checkbox inputs
    const daysOfWeek = new FormArray(
      // Initialize the checkboxes to the existing values if provided otherwise false
      this.daysOfWeek.map((day, index) => new FormControl(initialValues ? initialValues[index] : false)),
      this.atLeastOneCheckboxCheckedValidator.bind(this)
    );
    // Build a group of controls with start/end times, and days of week
    const group = new FormGroup({
      // Initialize start time to existing value if available, otherwise 12pm
      startTime: new FormControl(raidTime ? raidTime.startTime : '12:00:00', Validators.required),
      daysOfWeek
    });
    this.weeklyRaidTimes.push(group);
  }
  saveSchedule() {
    this.isSubmitted = true;
    if (this.scheduleForm.valid) {
      const raidTimes: WeeklyRaidTime[] = [];
      for (const raidTime of this.weeklyRaidTimes.value) {
        raidTimes.push({
          startTime: raidTime.startTime,
          weekMask: CalculateDaysInWeekMask(raidTime.daysOfWeek)
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
