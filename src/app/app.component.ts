import { Component, OnInit } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private tooltipConfig: NgbTooltipConfig, private userService: UserService) {
    tooltipConfig.openDelay = 1000;
  }

  ngOnInit() {
    this.userService.refreshSession();
  }
}
