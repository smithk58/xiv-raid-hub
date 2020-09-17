import { Component, OnInit } from '@angular/core';

import { faAtom, faChartBar, faHome, faUserCog, faUser, faSignInAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';
import { UserSession } from 'src/app/shared/api/xiv-raid-hub/models/user-session';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements  OnInit {
  faAtom = faAtom; faChartBar = faChartBar; faHome = faHome; faUserCog = faUserCog; faUser = faUser; faSignIn = faSignInAlt; faCog = faCog;
  session: UserSession;
  constructor(private userService: UserService, private notify: PNotifyService) { }

  ngOnInit() {
    this.userService.getUserSession().subscribe((session) => {
      this.session = session;
    }, (error) => {
      this.notify.error({text: 'Failed to get a session. ' + error});
    });
  }
  login() {
    this.userService.login();
  }
  logout() {
    this.userService.logout().subscribe(() => {
      this.notify.success({text: 'You have been logged out!'});
    });
  }
}
