import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import {Character} from 'src/app/shared/api/models/character';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {ClassToRole} from 'src/app/shared/Utils';

@Component({
  selector: 'app-add-edit-character',
  templateUrl: './add-edit-character.component.html',
  styleUrls: ['./add-edit-character.component.css']
})
export class AddEditCharacterComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  classToRole = ClassToRole;

  @ViewChild('form') form: NgForm;
  characterForm: FormGroup;
  characterControl: FormControl;
  isSubmitted = false;
  isEdit = false;
  selectedCharacter: Character;
  existingCharacterIds: Record<number, boolean>;
  classes = [];
  constructor(private modal: NgbActiveModal, private formBuilder: FormBuilder, private ffLogApi: FFLogsApiService) { }
  ngOnInit() {
    // Populate the list of available classes
    this.ffLogApi.getClasses().subscribe((classes) => {
      this.classes = classes;
    });
    // Prepopulate values from characterToEdit if provided
    let character = null;
    let defaultClass = null;
    if (this.selectedCharacter) {
      this.isEdit = true;
      character = {
        ID: this.selectedCharacter.id,
        Name: this.selectedCharacter.name,
        Server: this.selectedCharacter.server
      };
      defaultClass = this.selectedCharacter.defaultClass;
    }
    // Build form (character control has to be separated so we can populate it from app-search on selection)
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
  characterIsUnique(): ValidationErrors | null {
    const character = this.selectedCharacter;
    // Error if they've already added this person, only in add mode
    if (!this.isEdit && character && this.existingCharacterIds[character.id]) {
      return {notUnique: true};
    }
    return null;
  }
  /**
   * Triggered by the <app-search> when the user selects a character.
   * @param character - The character they selected.
   */
  characterSelected(character: Character) {
    this.selectedCharacter = character;
    this.characterControl.setValue(character.name);
  }
  /**
   * Triggered on form submit.
   */
  saveCharacter() {
    this.isSubmitted = true;
    if (this.characterForm.valid) {
      const result = this.selectedCharacter;
      result.defaultClass = this.characterForm.value.comparisonClass;
      this.modal.close(result);
    }
  }
  // convenience getter for easy access to form fields
  get f() { return this.characterForm.controls; }
}
