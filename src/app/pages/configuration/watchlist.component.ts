import { Component, OnInit } from '@angular/core';

import { faFileDownload, faFileUpload, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {WatchlistService} from './watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  // Icons
  faExport = faFileDownload; faImport = faFileUpload;
  faWarn = faExclamationTriangle;
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService,
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
}
