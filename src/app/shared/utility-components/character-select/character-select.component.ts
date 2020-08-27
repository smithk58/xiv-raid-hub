import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Character} from 'src/app/shared/api/xiv-raid-hub/models/character';
import {ClassToRole} from 'src/app/shared/Utils';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css']
})
export class CharacterSelectComponent {
  @Input() selectedValue: number;
  classToRole = ClassToRole;
  @Input() characters: Character[] = [];
  @Input() labelForId: string;
  @Output() selected: EventEmitter<Character> = new EventEmitter();
  constructor() { }
  onChange(character: Character) {
    this.selected.emit(character);
  }
}
