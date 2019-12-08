import { Component, OnInit } from '@angular/core';

import { faFileDownload, faFileUpload, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';

import {ConfigurationService} from './configuration.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  tabToSelect: string;
  // Icons
  faExport = faFileDownload; faImport = faFileUpload;
  faWarn = faExclamationTriangle;
  constructor(private wlService: ConfigurationService, private modalService: NgbModal, private notify: PNotifyService,
              private fflogs: FFLogsApiService) { }

  ngOnInit() {
    const reportId = 'PYGaA2zfrnMNJHBq';
    this.fflogs.getEncounterRankings(25).subscribe(rankings => {
      console.log('rankings', rankings);
    });
    this.fflogs.getZones().subscribe(zones => {
      console.log('zones', zones);
    });
    this.fflogs.getReport(reportId).subscribe(report => {
      console.log('report', report);
    });
    this.fflogs.getCharacterParses('Pocket Sans', 'Lamia', 'na', 29, undefined).subscribe(parses => {
      console.log('parses', parses);
    });
  }
  importData() {
    // TODO
  }
  exportData() {
    // TODO
  }
  onTabChange(tab: NgbTabChangeEvent) {
    const nextTabRoute = tab.nextId;
    this.selectTab(nextTabRoute, tab.activeId);
  }
  selectTab(tabId: string, oldTabId?: string) {
    // Iterate over existing tabs and set selected tab to that if we found it, otherwise send them to the not found route
    /*const tab = _.find(this.tabs, {route: tabId}) as MyStaticTab;
    if (tab) {
      this.router.navigate([{ outlets: {  tab: [tabId] } }], {relativeTo: this.route}).then( (succeeded) => {
        // Update the tab to the new tab if navigation succeded, otherwise revert the selected tab to the old tab ID (this is safe because
        // our deactivate guard prevents the other tab from being left/unloaded, so we just need to fix the tab header visually)
        if (succeeded) {
          this.tab = tab;
          this.tabToSelect = tabId;
        } else if (oldTabId) {
          // Revert back to the previous tab
          this.tabset.select(oldTabId);
        }
      }).catch( (error) => {
        this.goToErrorTab('There was an error while attempting to load the tab. ' + error);
      });
      // Remove error tab if there is one
      if (this.errorTabAdded) {
        this.tabs.pop();
        this.errorTabAdded = false;
      }
    } else {
      if (tabId !== 'error-tab') {
        const err = 'Unable to find the specified tab. You most likely don\'t have permission to view this tab or were sent here by ' +
          'mistake.';
        this.goToErrorTab(err);
      } else {
        // Attempt to send them to the first tab before continuing on to the error tab with a default error message
        const firstTab = (this.tabs && this.tabs.length > 0) ? this.tabs[0] : undefined;
        if (firstTab && firstTab.route !== 'error-tab') {
          this.selectTab(firstTab.route);
        } else {
          const err = 'You appear to have navigated directly to the error tab. Errors aren\'t persisted across page refreshes, so you ' +
            'should navigate to another tab or page.';
          this.goToErrorTab(err);
        }
      }
    }*/
  }
}
