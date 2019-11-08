import { Component } from '@angular/core';

import { faAtom, faChartBar, faHome, faUserCog, faUsers, faUserSecret, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  faAtom = faAtom; faChartBar = faChartBar; faHome = faHome; faUserCog = faUserCog; faUsers = faUsers;
  faSecret = faUserSecret; faSignIn = faSignInAlt;
  constructor() { }
}
