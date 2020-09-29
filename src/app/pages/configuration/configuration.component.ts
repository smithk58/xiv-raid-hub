import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfigurationPaths } from 'src/app/pages/configuration/ConfigurationPaths';

@Component({
  selector: 'app-watchlist',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  public Paths = ConfigurationPaths;
  configRoutes = [
    {
      id: ConfigurationPaths.Characters,
      label: 'Characters',
      route: ['/configuration/h/', {outlets: { tab: ConfigurationPaths.Characters}}]
    },
    {
      id: ConfigurationPaths.RaidGroups,
      label: 'Raid Groups',
      route: ['/configuration/h/', {outlets: { tab: ConfigurationPaths.RaidGroups}}]
    },
    {
      id: ConfigurationPaths.Alarms,
      label: 'Alarms',
      route: ['/configuration/h/', {outlets: { tab: ConfigurationPaths.Alarms}}]
    }
  ];
  selectedRoute: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // First child should be the subroute we're on and its path should match our ConfigurationPaths enum, needed for active sub route
    // selection to work after page refresh
    this.selectedRoute = this.route.snapshot.firstChild?.routeConfig.path;
  }
}
