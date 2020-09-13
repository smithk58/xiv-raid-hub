import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';
import { UserSession } from 'src/app/shared/api/xiv-raid-hub/models/user-session';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  session: UserSession;
  constructor(private userService: UserService, private notify: PNotifyService) { }
  ngOnInit() {
    this.userService.getUserSession().subscribe((session) => {
      this.session = session;
    }, (error) => {
      this.notify.error({text: 'Failed to get a session. ' + error});
    });
  }
}
