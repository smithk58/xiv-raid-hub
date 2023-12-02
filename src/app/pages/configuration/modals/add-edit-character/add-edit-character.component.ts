import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faInfoCircle, faSync } from '@fortawesome/free-solid-svg-icons';

import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';
import { CharacterSearchResultRow } from '@xivapi/angular-client';
import { CharacterService } from 'src/app/shared/api/xiv-raid-hub/character.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-character',
  templateUrl: './add-edit-character.component.html',
  styleUrls: ['./add-edit-character.component.css']
})
export class AddEditCharacterComponent implements OnInit {
  faInfoCircle = faInfoCircle; faSync = faSync;
  @Input()
  characterToEdit: Character;
  characterForm: UntypedFormGroup;
  characterControl: UntypedFormControl;
  isSubmitted = false;
  isEdit = false;
  attemptingRefresh = false;
  existingCharacterIds: Record<number, boolean>;
  constructor(private modal: NgbActiveModal, private formBuilder: UntypedFormBuilder, private characterService: CharacterService,
              private notify: PNotifyService
  ) { }
  ngOnInit() {
    this.isEdit = typeof(this.characterToEdit) !== 'undefined';
    // Prepopulate values from characterToEdit if provided
    let character = null;
    let defaultClass = null;
    if (this.characterToEdit) {
      character = {
        ID: this.characterToEdit.id,
        Name: this.characterToEdit.name,
        Server: this.characterToEdit.server
      };
      defaultClass = this.characterToEdit.defaultClass;
    }
    // Build form (character control has to be separated so we can populate it from app-character-search on selection)
    const characterControl = new UntypedFormControl({value: character, disabled: this.isEdit},
      {validators: [Validators.required, this.characterIsUnique.bind(this)]}
    );
    this.characterForm = this.formBuilder.group({
      character: characterControl,
      comparisonClass: [defaultClass, Validators.required]
    });
    this.characterControl = characterControl;
  }

  /**
   * Validates that a selected character hasn't already been added.
   */
  characterIsUnique(control: AbstractControl): ValidationErrors | null {
    const val: CharacterSearchResultRow = control.value;
    // Error if they've already added this person, only in add mode
    if (!this.isEdit && val && this.existingCharacterIds[val.ID]) {
      return {notUnique: true};
    }
    return null;
  }
  /**
   * Triggered on form submit.
   */
  saveCharacter() {
    this.isSubmitted = true;
    if (this.characterForm.valid) {
      const selCharacter = this.characterControl.value as CharacterSearchResultRow;
      const character: Character = {
        id: selCharacter.ID,
        name: selCharacter.Name,
        server: selCharacter.Server,
        defaultClass: this.characterForm.value.comparisonClass
      };
      this.modal.close(character);
    }
  }
  refreshCharacterInfo() {
    this.attemptingRefresh = true;
    this.characterService.refreshCharacterInfo(this.characterToEdit.id).pipe(
      finalize(() => {this.attemptingRefresh = false; })
    ).subscribe((characterInfo) => {
      this.characterForm.controls.character.value.Name = characterInfo.name;
      this.characterForm.controls.character.value.Server = characterInfo.server;

    }, (error) => {
      this.notify.error({text: 'Unable to refresh character name and server. ' + error});
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.characterForm.controls; }
}
