import { Component, OnInit } from '@angular/core';

import {faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import {Character} from 'src/app/shared/api/models/character';
import {ClassToRole} from 'src/app/shared/Utils';

@Component({
  selector: 'app-comparisons-card',
  templateUrl: './comparisons-card.component.html',
  styleUrls: ['./comparisons-card.component.css']
})
export class ComparisonsCardComponent implements OnInit {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt;
  classToRole = ClassToRole;
  comparisonTargets: Character[] = [];
  constructor() { }

  ngOnInit() {
  }
  comparisonTargetModal() {
    // a
  }
  deleteComparisonTarget() {
    // a
  }
}
