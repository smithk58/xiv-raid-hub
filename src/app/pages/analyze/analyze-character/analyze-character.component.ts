import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';

import {faCheck, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import {ConfigurationService} from 'src/app/pages/configuration/configuration.service';
import {AnalyzeService} from 'src/app/pages/analyze/analyze.service';
import {Character} from 'src/app/shared/api/xiv-raid-hub/models/character';
import {Parse} from 'src/app/shared/api/fflogs/models/Parse';
import {ZoneEncounter} from 'src/app/pages/analyze/shared/encounter-toolbar/ZoneEncounter';

@Component({
  selector: 'app-analyze-character',
  templateUrl: './analyze-character.component.html',
  styleUrls: ['./analyze-character.component.css']
})
export class AnalyzeCharacterComponent implements OnInit, OnDestroy {
  faCheckmark = faCheck; faInfoCircle = faInfoCircle;
  zoneEncounter: ZoneEncounter;
  /*Analysis target*/
  atCharacter: Character;
  atClassFilter: FormControl; atClassFilter$;
  atSelectedParse: Parse;
  /*Comparison target*/
  ctAvailableCharacters: Character[];
  ctCharacter: Character;
  lastSelectedClass: string;
  ctSelectedParse: Parse;
  constructor(private route: ActivatedRoute, private wlService: ConfigurationService, private analyzeService: AnalyzeService) { }
  ngOnInit() {
    // TODO Preserve selected zone/encounter for page refresh via params
    // TODO Lookup character if they don't have it, send to error page if not found
    // TODO Watch params for characterID, reload character on change
    // Create a filter control for atCharacters and ctCharacter
    this.atClassFilter = new FormControl(null);
    // Watch for class filter changes, filter the parses on the newly selected class
    this.atClassFilter$ = this.atClassFilter.valueChanges.subscribe( value => {
      // Save last selected class to display next comparison target and to filter parses with
      this.lastSelectedClass = value;
      // Recalculate comparison targets for the new class
      this.wlService.getComparisonTargets().subscribe(comparisonTargets => {
        this.ctAvailableCharacters = comparisonTargets.filter(ct => value === null || value === ct.defaultClass);
      });
    });
    // Attempt to lookup the character ID in the url
    const characterId = parseInt(this.route.snapshot.params.characterId, 10);
    this.wlService.getFriend(characterId).subscribe(character => {
      this.atCharacter = character;
      // Update the class filter to the current characters default class
      this.atClassFilter.setValue(this.atCharacter?.defaultClass);
    });
  }
  /**
   * Populates the parse listing to the ones we can find for the specified zone.
   * @param zoneEncounter - The zone/encounter to get parses for.
   */
  getParsesByZone(zoneEncounter: ZoneEncounter) {
    this.zoneEncounter = zoneEncounter;
  }

  /**
   * Sets the provided character as the comparison target.
   * @param character -
   */
  comparisonTargetSelected(character: Character) {
    this.ctCharacter = character;
  }

  /**
   * Triggered when a report from the analysis target table is selected.
   * @param parse -
   */
  atParseSelected(parse: Parse) {
    this.atSelectedParse = parse;
  }

  /**
   * Triggered when a report from the comparison target table is selected.
   * @param parse -
   */
  ctParseSelected(parse: Parse) {
    this.ctSelectedParse = parse;
  }
  ngOnDestroy() {
    if (this.atClassFilter$) {
      this.atClassFilter$.unsubscribe();
    }
  }
}
