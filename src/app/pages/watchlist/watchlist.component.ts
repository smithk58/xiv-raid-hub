import { Component, OnInit } from '@angular/core';

import { faFileDownload, faFileUpload, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {WatchlistService} from './watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  // Icons
  faExport = faFileDownload; faImport = faFileUpload;
  faWarn = faExclamationTriangle;
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService) { }

  ngOnInit() {
    // a
  }
  importData() {
    // TODO
  }
  exportData() {
    // TODO
  }
}
