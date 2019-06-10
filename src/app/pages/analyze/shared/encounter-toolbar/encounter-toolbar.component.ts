import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {ExpansionToBracketMin} from 'src/app/shared/Utils';
import {Encounter, Zone} from 'src/app/shared/api/fflogs/models/Zone';
import {AnalyzeService} from 'src/app/pages/analyze/analyze.service';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {ZoneEncounter} from 'src/app/pages/analyze/shared/encounter-toolbar/ZoneEncounter';

@Component({
  selector: 'app-encounter-toolbar',
  templateUrl: './encounter-toolbar.component.html',
  styleUrls: ['./encounter-toolbar.component.css']
})
export class EncounterToolbarComponent implements OnInit {
  @Output() selected: EventEmitter<ZoneEncounter> = new EventEmitter();
  selectedExpansion: string;
  expansions: string[];
  /*Zones*/
  zones: Zone[];
  filteredZones: Zone[];
  selectedZone: Zone;
  /*Encounters*/
  selectedEncounter: Encounter;
  encounters: Encounter[];
  constructor(private analyzeService: AnalyzeService, private fflogsApi: FFLogsApiService) { }

  ngOnInit() {
    // Get the available zone brackets and select the latest one by default
    this.expansions = this.analyzeService.getRaidableExpansions();
    // Get the available zones, immediately filter by the current bracket
    this.fflogsApi.getZones().subscribe( zones => {
      this.zones = zones;
      // Default to latest expansion
      this.setExpansion(this.expansions[0]);
    });
  }
  /**
   * Sets the current expansion and updates the zones to the current expansions zones
   * @param expansion - The expansion to switch to.
   */
  setExpansion(expansion: string) {
    this.selectedExpansion = expansion;
    this.setZones(expansion);
  }
  /**
   * Filters zones by the specified expansion.
   * @param expansion - The expansion to filter the zones by (must match a string in ExpansionToBracketMin)
   */
  setZones(expansion: string) {
    const bracket = ExpansionToBracketMin[expansion];
    // Filter zones by expansion
    this.filteredZones = this.zones.filter(zone => zone.brackets.min === bracket);
    // Reset selected zone and encounters
    this.selectedZone = this.analyzeService.getDefaultZoneForExpansion(expansion, this.filteredZones);
    // Set list of encounters
    if (this.selectedZone) {
      this.setEncounters(this.selectedZone);
    }
  }

  /**
   * Sets the currently available encounters to the ones on the specified zone.
   * @param zone - The zone to get encounters from.
   */
  setEncounters(zone: Zone) {
    this.selectedEncounter = null;
    this.encounters = zone.encounters;
  }
  /**
   * Sets the current encounter to the specified one.
   * @param encounter - The encounter to set to.
   */
  setEncounter(encounter: Encounter) {
    this.selected.emit({zone: this.selectedZone, encounter});
  }
}
