import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { faSpinner, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { SettingsService } from 'src/app/pages/settings/settings.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  faSpinner = faSpinner; faInfoCircle = faInfoCircle;
  isSubmitted = false;
  settingsLoading = true;
  formIsSaving = false;
  settingsForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private settingsService: SettingsService, private pNotify: PNotifyService) { }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      allowAddToRaidGroup: [undefined, Validators.required],
    });
    this.initializeSettings();
  }
  initializeSettings() {
    // TODO ability to delete account
    this.settingsLoading = true;
    this.settingsService.getSettings().pipe(
      finalize(() => {this.settingsLoading = false; })
    ).subscribe((settings) => {
      Object.keys(settings).forEach((key) => {
        const control = this.settingsForm.get(key);
        if (control) {
          control.setValue(settings[key]);
        }
      });
    }, (error) => {
      this.pNotify.error({text: 'Unable to get user settings. ' + error});
    });
  }
  saveSettings() {
    this.isSubmitted = true;
    if (this.settingsForm.valid) {
      this.formIsSaving = true;
      this.settingsService.saveSettings(this.settingsForm.value).pipe(
        finalize(() => {this.formIsSaving = false; })
      ).subscribe(() => {
        this.pNotify.success({text: 'User settings were successfully saved!'});
      }, (error) => {
        this.pNotify.error({text: 'Unable to save user settings. ' + error});
      });
    }
  }
}
