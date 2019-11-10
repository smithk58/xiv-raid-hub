import { Component } from '@angular/core';

import { faAtom, faChartBar, faHome, faUserCog, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  faAtom = faAtom; faChartBar = faChartBar; faHome = faHome; faUserCog = faUserCog; faUser = faUser; faSignIn = faSignInAlt;
  constructor() { }
}
