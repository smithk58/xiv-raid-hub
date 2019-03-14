import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {WatchlistService} from '../../watchlist/watchlist.service';
import {Character} from 'src/app/shared/api/models/character';
import {AnalyzeService} from 'src/app/pages/analyze/analyze.service';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {Encounter, Zone} from 'src/app/shared/api/fflogs/models/Zone';
import {ExpansionToBracketMin} from 'src/app/shared/Utils';

@Component({
  selector: 'app-analyze-character',
  templateUrl: './analyze-character.component.html',
  styleUrls: ['./analyze-character.component.css']
})
export class AnalyzeCharacterComponent implements OnInit {
  /*Expansions*/
  selectedExpansion: string;
  expansions: string[];
  /*Zones*/
  zones: Zone[];
  filteredZones: Zone[];
  selectedZone: Zone;
  /*Encounters*/
  selectedEncounter: Encounter;
  encounters: Encounter[];
  analyzeTarget: Character;
  constructor(private route: ActivatedRoute, private wlService: WatchlistService, private analyzeService: AnalyzeService,
              private fflogsApi: FFLogsApiService
  ) { }
  ngOnInit() {
    // Get the available zone brackets and select the latest one by default
    this.expansions = this.analyzeService.getRaidableExpansions();
    // Get the available zones, immediately filter by the current bracket
    this.fflogsApi.getZones().subscribe( zones => {
      this.zones = zones;
      // Default to latest expansion
      this.setExpansion(this.expansions[0]);
    });
    // Attempt to lookup the character ID in the url
    const characterId = parseInt(this.route.snapshot.params.characterId, 10);
    this.wlService.getFriend(characterId).subscribe(character => {
      console.log('character', character);
      if (character) {
        this.analyzeService.getCharacterReports(character).subscribe(res => {
          console.log('res', res);
        });
      }
    });
    /*if (character) {
      this.analyzeService.getCharacterReports(character).subscribe(res => {
        console.log('res', res);
      });
    } else {
      // TODO attempt to resolve id via xivapi instead. Show error if that fails as well.
    }*/
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

    this.selectedEncounter = null;
    this.setEncounters(this.selectedZone);
  }
  /**
   * Sets the current set of encounters to the ones on the specified zone.
   * @param zone - The zone to get encounters of, otherwise null to set it to all filtered zones encounters
   */
  setEncounters(zone: Zone) {
    if (zone) {
      this.encounters = zone.encounters;
    } else {
      let encounters = [];
      this.filteredZones.forEach(aZone => encounters = encounters.concat(aZone.encounters));
      this.encounters = encounters;
    }
  }
}
