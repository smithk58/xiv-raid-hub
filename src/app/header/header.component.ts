import { Component, OnInit } from '@angular/core';

import { faAtom, faChartBar, faHome, faUserCog, faUsers, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  faAtom = faAtom; faChartBar = faChartBar; faHome = faHome; faUserCog = faUserCog; faUsers = faUsers; faWarn = faExclamationTriangle;
  constructor() { }
  ngOnInit() {
    // a
  }
}
