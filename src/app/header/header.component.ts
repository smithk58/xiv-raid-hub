import { Component } from '@angular/core';

import { faAtom, faChartBar, faHome, faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  faAtom = faAtom; faChartBar = faChartBar; faHome = faHome; faUserCog = faUserCog; faUsers = faUsers;
  constructor() { }
}
