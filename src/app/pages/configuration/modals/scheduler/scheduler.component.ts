import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import { DaysInWeekBit } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  faTrash = faTrashAlt; faPlus = faPlus;
  daysOfWeek: string[];
  scheduleForm: FormGroup;
  weeklyRaidTimes: FormArray;
  isSubmitted = false;
  constructor(private modal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Build available days of week from our enum
    this.daysOfWeek = Object.keys(DaysInWeekBit).filter(x => isNaN(Number(x)));
    // Build schedule form
    this.weeklyRaidTimes = new FormArray([]);
    this.scheduleForm = this.formBuilder.group({
      weeklyRaidTimes: this.weeklyRaidTimes
    });
  }

  /**
   * Adds a new weekly raid time section to the form.
   */
  addWeeklyRaidTime() {
    // Build a form array of checkbox inputs
    const daysOfWeek = new FormArray(
      this.daysOfWeek.map((day) => new FormControl(false)),
      this.atLeastOneCheckboxCheckedValidator.bind(this)
    );
    // Build a group of controls with start/end times, and days of week
    const group = new FormGroup({
      startTime: new FormControl('12:00:00', Validators.required),
      daysOfWeek
    });
    this.weeklyRaidTimes.push(group);
  }
  saveSchedule() {
    this.isSubmitted = true;
    if (this.scheduleForm.valid) {
      console.log('valid!');
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
