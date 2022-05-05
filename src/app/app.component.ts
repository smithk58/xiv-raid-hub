import { Component, OnInit } from '@angular/core';
import { NgbPopoverConfig, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private tooltipConfig: NgbTooltipConfig, private popoverConfig: NgbPopoverConfig, private userService: UserService) {
    tooltipConfig.openDelay = 1000;
    popoverConfig.openDelay = 1000;
    popoverConfig.triggers = 'mouseenter:mouseleave';
  }

  ngOnInit() {
    this.userService.refreshSession();
  }
}
