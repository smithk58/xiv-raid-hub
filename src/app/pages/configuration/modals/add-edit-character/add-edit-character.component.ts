import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';
import { CharacterSearchResultRow } from '@xivapi/angular-client';

@Component({
  selector: 'app-add-edit-character',
  templateUrl: './add-edit-character.component.html',
  styleUrls: ['./add-edit-character.component.css']
})
export class AddEditCharacterComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  characterForm: FormGroup;
  characterControl: FormControl;
  isSubmitted = false;
  isEdit = false;
  characterToEdit: Character;
  existingCharacterIds: Record<number, boolean>;
  constructor(private modal: NgbActiveModal, private formBuilder: FormBuilder) { }
  ngOnInit() {
    // Prepopulate values from characterToEdit if provided
    let character = null;
    let defaultClass = null;
    if (this.characterToEdit) {
      this.isEdit = true;
      character = {
        ID: this.characterToEdit.id,
        Name: this.characterToEdit.name,
        Server: this.characterToEdit.server
      };
      defaultClass = this.characterToEdit.defaultClass;
    }
    // Build form (character control has to be separated so we can populate it from app-character-search on selection)
    const characterControl = new FormControl({value: character, disabled: this.isEdit},
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
  // convenience getter for easy access to form fields
  get f() { return this.characterForm.controls; }
}
