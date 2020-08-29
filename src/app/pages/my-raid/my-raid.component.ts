import { Component, OnInit } from '@angular/core';

import { MyRaidTab } from 'src/app/pages/my-raid/MyRaidTab';

@Component({
  selector: 'app-my-raid',
  templateUrl: './my-raid.component.html',
  styleUrls: ['./my-raid.component.scss']
})
export class MyRaidComponent implements OnInit {
  tabs: MyRaidTab[] = [];
  tabToSelect: string;
  constructor() { }

  ngOnInit() {
  }
}
