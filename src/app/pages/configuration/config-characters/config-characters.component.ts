import { Component, OnInit } from '@angular/core';

import {faChartBar, faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-config-characters',
  templateUrl: './config-characters.component.html',
  styleUrls: ['./config-characters.component.scss']
})
export class ConfigCharactersComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  constructor() { }

  ngOnInit() {
  }

}
