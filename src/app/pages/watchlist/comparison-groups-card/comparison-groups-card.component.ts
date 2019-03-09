import { Component, OnInit } from '@angular/core';

import {faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import {ClassToRole} from 'src/app/shared/Utils';
import {CharacterGroup} from 'src/app/shared/api/models/character-group';

@Component({
  selector: 'app-comparison-groups-card',
  templateUrl: './comparison-groups-card.component.html',
  styleUrls: ['./comparison-groups-card.component.css']
})
export class ComparisonGroupsCardComponent implements OnInit {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt;
  classToRole = ClassToRole;
  comparisonGroups: CharacterGroup[] = [];
  constructor() { }

  ngOnInit() {
  }
  comparisonGroupModal() {
    // a
  }
  deleteComparisonGroup() {
    // a
  }
}
