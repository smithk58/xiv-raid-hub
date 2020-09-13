import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, FormArray } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CharacterSearchResultRow } from '@xivapi/angular-client';

import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { RaidGroupCharacter } from 'src/app/shared/api/xiv-raid-hub/models/raid-group-character';

@Component({
  selector: 'app-add-edit-raid-group',
  templateUrl: './add-edit-raid-group.component.html',
  styleUrls: ['./add-edit-raid-group.component.css']
})
export class AddEditRaidGroupComponent implements OnInit {
  raidGroupForm: FormGroup;
  characterControls: FormArray;
  requiredCharacters = 8; // The amount of members that will be generated on the form
  isSubmitted = false;
  isEdit = false;
  raidGroup: RaidGroup;
  existingCharacterIds: Record<number, number> = {}; /*id -> howManyTimesItsUsed*/
  indexToCharacterId: Record<number, number> = {}; /*index -> number*/
  constructor(private modal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.isEdit = typeof(this.raidGroup) !== 'undefined';
    this.initializeForm(this.raidGroup);
  }
  initializeForm(raidGroup?: RaidGroup) {
    const name = raidGroup ? raidGroup.name : '';
    const purpose = raidGroup ? raidGroup.purpose : '';
    const characters = raidGroup ? raidGroup.characters : undefined;
    // Build form (character control has to be separated so we can trigger validate)
    this.characterControls = this.buildCharacterControlList(characters);
    this.raidGroupForm = this.formBuilder.group({
      name: [name, [Validators.required, Validators.maxLength(30)]],
      purpose: [purpose, Validators.maxLength(10)],
      characters: this.characterControls
    });
  }
  /**
   * Builds the form controls for each required character
   * @param defaultValues - The default character values to apply to the form controls being built.
   */
  buildCharacterControlList(defaultValues?: RaidGroupCharacter[]) {
    const controls = [];
    for (let i = 0; i < this.requiredCharacters; i++) {
      // Populate the controls w/ default values if available
      const isValue = defaultValues && (i < defaultValues.length);
      const character = !isValue ? null : {
        ID: defaultValues[i].character.id,
        Name: defaultValues[i].character.name,
        Server: defaultValues[i].character.server
      };
      const comparisonClass = !isValue ? null : defaultValues[i].defaultClass;
      controls.push(this.formBuilder.group({
        character: [character, {validators: [Validators.required, this.characterIsUnique.bind(this)]}],
        comparisonClass: [comparisonClass, Validators.required]
      }));
    }
    return this.formBuilder.array(controls);
  }
  /**
   * Validates that a selected character hasn't already been added.
   */
  characterIsUnique(control: AbstractControl): ValidationErrors | null {
    const val: CharacterSearchResultRow = control.value;
    // Error if this control is using an id that's being used more than once
    if (val && this.existingCharacterIds[val.ID] > 1) {
      return {notUnique: true};
    }
    return null;
  }
  /**
   * Triggered by the <app-character-search> when the user selects a character.
   * @param index - The index of the control the character was selected at.
   * @param character - The character they selected.
   */
  characterSelected(index: number, character: Character) {
    // Decrement existing character ID map, if this control had a character assigned previously
    const prevId = this.indexToCharacterId[index];
    if (typeof(prevId) !== 'undefined' && prevId !== null) {
      this.existingCharacterIds[prevId]--;
    }
    // Update index -> id map to the new value
    this.indexToCharacterId[index] = character ? character.id : null;
    // Increment existing character ID map if they selected a character
    if (character) {
      // Assign 1 to the id if in the map if this is the first, otherwise increment
      const exists = typeof(this.existingCharacterIds[character.id]) !== 'undefined';
      this.existingCharacterIds[character.id] = exists ? this.existingCharacterIds[character.id] + 1 : 1;
    }
    // Manually trigger validation on all characters, since this happens after the form naturally validates the first time
    this.characterControls.controls.forEach(control => {
      control.get('character').updateValueAndValidity();
    });
  }
  /**
   * Triggered on form submit.
   */
  saveRaidGroup() {
    this.isSubmitted = true;
    if (this.raidGroupForm.valid) {
      // Builds characters from the search components + class inputs
      const characters: RaidGroupCharacter[] = [];
      for (let i = 0; i < this.characterControls.controls.length; i++) {
        const control = this.characterControls.controls[i];
        const char = control.get('character').value as CharacterSearchResultRow;
        const dClass = control.get('comparisonClass').value;
        characters.push({
          defaultClass: dClass,
          order: i + 1,
          character: {
            id: char.ID,
            name: char.Name,
            server: char.Server,
          }
        });
      }
      // Build raid groups from characters
      const raidGroup: RaidGroup = {
        id: this.isEdit ? this.raidGroup.id : undefined,
        share: false, // TODO add to/retrieve from form
        name: this.raidGroupForm.get('name').value,
        purpose: this.raidGroupForm.get('purpose').value,
        characters
      };
      this.modal.close(raidGroup);
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.raidGroupForm.controls; }
  get getCharacterControls() { return (this.raidGroupForm.get('characters') as FormArray).controls; }
}
