import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {ExpansionToBracketMin} from 'src/app/shared/Utils';
import {Encounter, Partition, Zone} from 'src/app/shared/api/fflogs/models/Zone';
import {AnalyzeService} from 'src/app/pages/analyze/analyze.service';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {ZoneEncounter} from 'src/app/pages/analyze/shared/encounter-toolbar/ZoneEncounter';

@Component({
  selector: 'app-encounter-toolbar',
  templateUrl: './encounter-toolbar.component.html',
  styleUrls: ['./encounter-toolbar.component.css']
})
export class  EncounterToolbarComponent implements OnInit {
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
  /*Partitions*/
  selectedPartition: Partition;
  partitions: Partition[];
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
    // Set list of encounters and partitions
    if (this.selectedZone) {
      this.setZone(this.selectedZone);
    }
  }

  /**
   * Sets the currently available encounters and partitions to the ones on the specified zone.
   * @param zone - The zone to get encounters/partitions from.
   */
  setZone(zone: Zone) {
    this.selectedEncounter = null;
    this.encounters = zone.encounters;
    // Set partitions as well
    this.setPartitions(this.selectedZone.partitions ? this.selectedZone.partitions : []);
  }
  /**
   * Sets the current encounter to the specified one.
   * @param encounter - The encounter to set to.
   */
  setEncounter(encounter: Encounter) {
    this.selected.emit({zone: this.selectedZone, encounter, partition: this.selectedPartition});
  }

  /**
   * Sets the currently available partitions.
   * @param partitions - The partitions to set to.
   */
  setPartitions(partitions: Partition[]) {
    // Assign indexes to the partitions (need index for the api, ng-select doesn't have a convenient way to get it, and I don't trust these
    // weird partition objects to be unique)
    partitions.forEach((partition, index) => partition.position = index + 1); // API wants 1 based index
    // TODO Wtf does Partition.area do? Seems like you only ever want area = 1...yet other ones exist
    // Filter partitions down to the first partitions area if it has one for now, otherwise show all partitions
    const firstAreaValue = (partitions.length > 0 && typeof(partitions[0].area) !== 'undefined') ? partitions[0].area : undefined;
    if (firstAreaValue) {
      this.partitions = partitions.filter((partition) => partition.area === firstAreaValue);
    } else {
      this.partitions = partitions;
    }
    // Set the currently selected partition to the default one, if one is found
    this.selectedPartition = this.partitions.find(partition => partition.default);
  }

  /**
   * Sets the current partition to the specified one.
   * @param partition - The partition to set to.
   */
  setPartition(partition: Partition) {
    this.selected.emit({zone: this.selectedZone, encounter: this.selectedEncounter, partition});
  }
}
