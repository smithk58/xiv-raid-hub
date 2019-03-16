import {Component, OnInit, Input} from '@angular/core';

import {faExclamationTriangle, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {GridOptions} from 'ag-grid-community';

import {Parse} from 'src/app/shared/api/fflogs/models/Parse';
import {Encounter} from 'src/app/shared/api/fflogs/models/Zone';
import {ReportLinksComponent} from 'src/app/pages/analyze/shared/ag-grid-columns/report-links/report-links.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  faInfoCircle = faInfoCircle; faExclamation = faExclamationTriangle ;
  // Inputs
  @Input() sortField = 'startTime';
  @Input() encounter: Encounter;
  sParses: Parse[] = [];
  // Grid options/api
  private gridOptions: GridOptions; gridApi; columnApi; agComponents; componentContext;
  constructor() {
    // Add the angular components we want accessible to ag grid
    this.agComponents = {
      reportLinks: ReportLinksComponent
    };
    // Make this components context available to the components we pass to ag grid
    this.componentContext = {
      component: this
    };
  }
  /**
   * Used to set the full set of parses available to this component.
   * @param parses -
   */
  @Input() set parses(parses: Parse[]) {
    if (parses) {
      this.sParses = parses;
      // If we're provided parses again and the grid API is available, update the row data
      if (this.gridApi) {
        this.updateParses(parses);
      }
    }
  }
  ngOnInit() {
    // Initialize the parses table
    this.initializeGrid();
  }
  initializeGrid() {
    this.gridOptions = {
      suppressCellSelection: true,
      rowHeight: 30,
      rowSelection: 'single',
      rowData: this.sParses // Will be empty initially unless the parses were cached
    } as GridOptions;
    this.gridOptions.defaultColDef = {
      filter: true,
      sortable: true,
      sortingOrder: ['asc', 'desc']
    };
    this.gridOptions.columnDefs = [
      {
        headerName: 'Date',
        field: 'startTime',
        width: 90,
        valueFormatter: params => {
          return new Date(params.value).toLocaleDateString();
        }
      }, {
        headerName: '%',
        field: 'percentile',
        width: 75,
        valueFormatter: params => {
          return params.value + '%';
        }
      }, {
        headerName: 'DPS',
        field: 'total',
        width: 85,
        valueFormatter: (params) => {
          return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
      }, {
        headerName: 'Duration',
        field: 'duration',
        width: 90,
        valueFormatter: (params) => {
          const d = new Date(params.value);
          const seconds = d.getUTCSeconds();
          return d.getUTCMinutes() + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
        }
      }, {
        headerName: 'Class',
        field: 'spec',
        width: 90
      }, {
        cellRenderer: 'reportLinks',
        width: 75,
        suppressSizeToFit: true,
        filter: false,
        sortable: false,
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
  /**
   * Called to update what parses are currently shown and resort them.
   * @param parses - The full list of parses.
   */
  updateParses(parses: Parse[]) {
    this.gridApi.setRowData(parses);
    this.gridApi.setSortModel([{colId: this.sortField, sort: 'desc'}]);
  }
}
