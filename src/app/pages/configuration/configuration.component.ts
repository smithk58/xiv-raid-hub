import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faFileDownload, faFileUpload, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { ConfigurationPaths } from 'src/app/pages/configuration/ConfigurationPaths';

@Component({
  selector: 'app-watchlist',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  tabToSelect: string;
  public Paths = ConfigurationPaths;
  // Icons
  faExport = faFileDownload; faImport = faFileUpload; faWarn = faExclamationTriangle;
  charactersRoute = ['/configuration/h/', {outlets: { tab: ConfigurationPaths.Characters}}];
  staticsRoute = ['/configuration/h/', {outlets: { tab: ConfigurationPaths.Statics}}];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // First child should be the subroute we're on and its path should match our ConfigurationPaths enum
    this.tabToSelect = this.route.snapshot.firstChild.routeConfig.path;
  }
  importData() {
    // TODO
  }
  exportData() {
    // TODO
  }
}
