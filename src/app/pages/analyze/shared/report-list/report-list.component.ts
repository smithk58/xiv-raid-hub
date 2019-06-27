import {Component, OnInit, Input, HostListener, Output, EventEmitter, OnChanges, OnDestroy} from '@angular/core';

import {faExclamationTriangle, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {GridOptions, RowSelectedEvent} from 'ag-grid-community';
import {Subject} from 'rxjs';
import { debounceTime} from 'rxjs/operators';

import {Parse} from 'src/app/shared/api/fflogs/models/Parse';
import {ReportLinksComponent} from 'src/app/pages/analyze/shared/ag-grid-columns/report-links/report-links.component';
import {GridUtils} from 'src/app/pages/analyze/shared/ag-grid-columns/GridUtils';
import {Character} from 'src/app/shared/api/models/character';
import {ZoneEncounter} from 'src/app/pages/analyze/shared/encounter-toolbar/ZoneEncounter';
import {AnalyzeService} from 'src/app/pages/analyze/analyze.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit, OnChanges, OnDestroy {
  faInfoCircle = faInfoCircle; faExclamation = faExclamationTriangle ;
  @Input() zoneEncounter: ZoneEncounter;
  @Input() character: Character;
  @Input() filterByClass: string;
  @Input() sortField = 'startTime';
  @Output() parseSelected: EventEmitter<Parse> = new EventEmitter();
  /*Parse data*/
  getParses$ = new Subject();
  // Grid options/api
  private gridOptions: GridOptions; gridApi; columnApi; agComponents; componentContext;
  constructor(private analyzeService: AnalyzeService, private pNotify: PNotifyService) {
    // Add the angular components we want accessible to ag grid
    this.agComponents = {
      reportLinks: ReportLinksComponent
    };
    // Make this components context available to the components we pass to ag grid
    this.componentContext = {
      component: this
    };
  }
  ngOnChanges() {
    // Regrab/filter reports when we're given new input
    this.getParses$.next();
  }
  ngOnInit() {
    // Initialize the parses table
    this.initializeGrid();
    // Watch for pushes to getReports$ and regrab/filter parses
    this.getParses$.pipe(debounceTime(100)).subscribe(() => {
      // Requires both a character and a zone/encounter, otherwise set parses to nothing
      if (this.character && this.zoneEncounter) {
        const eId = this.zoneEncounter.encounter.id;
        const pIdx = this.zoneEncounter.partition.position;
        this.analyzeService.getCharacterReports(this.character, this.zoneEncounter.zone.id, eId, pIdx).subscribe(parses => {
          // Filter parses by class, if it's available
          const nParses = this.filterByClass ? parses.filter(parse => parse.spec === this.filterByClass) : parses;
          this.updateParses(nParses);
        }, (err) => {
          this.pNotify.error({text: 'Unable to get character parses. ' + err});
        });
      } else {
        this.updateParses([]);
      }
    });
  }
  initializeGrid() {
    this.gridOptions = {
      suppressCellSelection: true,
      rowHeight: 30,
      rowSelection: 'single',
      rowData: [],
      onRowSelected: (event: RowSelectedEvent) => {
        this.parseSelected.emit(event.data);
      }
    } as GridOptions;
    this.gridOptions.defaultColDef = {
      filter: true,
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      sortingOrder: ['asc', 'desc']
    };
    this.gridOptions.columnDefs = [
      {
        headerName: 'Date',
        field: 'startTime',
        width: 100,
        valueFormatter: GridUtils.dateFormatter
      }, {
        headerName: '%',
        field: 'percentile',
        width: 75,
        valueFormatter: params => {
          return params.value + '%';
        }, cellStyle: GridUtils.percentileStyles,
      }, {
        headerName: 'DPS',
        field: 'total',
        width: 85,
        valueFormatter: GridUtils.numberFormatter
      }, {
        headerName: 'Duration',
        field: 'duration',
        width: 90,
        valueFormatter: GridUtils.minutesSecondsFormatter
      }, {
        headerName: 'Class',
        field: 'spec',
        minWidth: 110, /*This column fills the tables whitespace, but has a minimum size to remain readable*/
        suppressSizeToFit: false
      }, {
        cellRenderer: 'reportLinks',
        width: 75,
        filter: false,
        sortable: false,
        resizable: false,
        pinned: 'right'
      }
    ];
  }
  /**
   * Triggered when the grid is finished initializing.
   * @param params - Grid parameters (see ag-grid docs)
   */
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.setSortModel([{colId: this.sortField, sort: 'desc'}]);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Resize the grid columns if the grid is loaded
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
  /**
   * Called to update what parses are currently shown and resort them.
   * @param parses - The full list of parses.
   */
  updateParses(parses: Parse[]) {
    this.gridApi.setRowData(parses);
    this.gridApi.setSortModel([{colId: this.sortField, sort: 'desc'}]);
    this.gridApi.sizeColumnsToFit();
  }
  ngOnDestroy() {
    if (this.getParses$) {
      this.getParses$.unsubscribe();
    }
  }
}
