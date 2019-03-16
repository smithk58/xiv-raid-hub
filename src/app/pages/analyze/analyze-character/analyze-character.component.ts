import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';

import {Subject} from 'rxjs';

import {WatchlistService} from 'src/app/pages/watchlist/watchlist.service';
import {AnalyzeService} from 'src/app/pages/analyze/analyze.service';
import {Character} from 'src/app/shared/api/models/character';
import {Parse} from 'src/app/shared/api/fflogs/models/Parse';
import {ZoneEncounter} from 'src/app/pages/analyze/shared/encounter-toolbar/ZoneEncounter';

@Component({
  selector: 'app-analyze-character',
  templateUrl: './analyze-character.component.html',
  styleUrls: ['./analyze-character.component.css']
})
export class AnalyzeCharacterComponent implements OnInit, OnDestroy {
  zoneEncounter: ZoneEncounter;
  /*Analysis target*/
  atCharacter: Character;
  atClassFilter: FormControl; atClassFilter$;
  atParses: Parse[]; // All parses for character
  atFilteredParses: Parse[]; // Filtered by class
  atReports$ = new Subject<{character: Character, zoneEncounter: ZoneEncounter}>();
  /*Comparison target*/
  ctAvailableCharacters: Character[];
  ctCharacter: Character;
  lastSelectedClass: string;
  ctParses: Parse[]; // All parses for character
  ctFilteredParses: Parse[]; // Filtered by class
  ctReports$ = new Subject<{character: Character, zoneEncounter: ZoneEncounter}>();
  constructor(private route: ActivatedRoute, private wlService: WatchlistService, private analyzeService: AnalyzeService) { }
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
        this.ctAvailableCharacters = comparisonTargets.filter(ct => ct.defaultClass === value);
      });
      // Retrigger filtering for both analysis target and comparison target
      this.atReports$.next({character: this.atCharacter, zoneEncounter: this.zoneEncounter});
      this.ctReports$.next({character: this.ctCharacter, zoneEncounter: this.zoneEncounter});
    });

    // Watch for analysis target character/encounter changes to get parses for the combination
    this.atReports$.subscribe(() => {
      // Requires both a character and a zone/encounter, otherwise set filtered to nothing
      if (this.atCharacter && this.zoneEncounter) {
        const eId = this.zoneEncounter.encounter.id;
        this.analyzeService.getCharacterReports(this.atCharacter, this.zoneEncounter.zone.id, eId).subscribe( parses => {
          this.atParses = parses;
          // Filter parses by default class, if it's available
          const filter = this.lastSelectedClass !== null;
          this.atFilteredParses = filter ? this.atParses.filter(parse => parse.spec === this.lastSelectedClass) : this.atParses;
        });
      } else {
        this.atParses = [];
        this.atFilteredParses = [];
      }
    });
    // Watch for comparison target/encounter changes to get parses for the combination
    this.ctReports$.subscribe(() => {
      // Requires both a character and a zone/encounter, otherwise set filtered to nothing
      if (this.ctCharacter && this.zoneEncounter) {
        const eId = this.zoneEncounter.encounter.id;
        this.analyzeService.getCharacterReports(this.ctCharacter, this.zoneEncounter.zone.id, eId).subscribe( parses => {
          this.ctParses = parses;
          // We filter ct parses off of analysis targets class, we supply parses if a class is selected (to prevent cross class comparison)
          const filter = this.lastSelectedClass !== null;
          this.ctFilteredParses = filter ? this.ctParses.filter(parse => parse.spec === this.lastSelectedClass) : [];
        });
      } else {
        this.ctParses = [];
        this.ctFilteredParses = [];
      }
    });
    // Attempt to lookup the character ID in the url
    const characterId = parseInt(this.route.snapshot.params.characterId, 10);
    this.wlService.getFriend(characterId).subscribe(character => {
      this.atCharacter = character;
      // Update the class filter to the current characters and trigger get reports
      this.atClassFilter.setValue(this.atCharacter.defaultClass);
      this.atReports$.next({character, zoneEncounter: this.zoneEncounter});
    });
  }
  /**
   * Populates the parse listing to the ones we can find for the specified zone.
   * @param zoneEncounter - The zone/encounter to get parses for.
   */
  getParsesByZone(zoneEncounter: ZoneEncounter) {
    this.zoneEncounter = zoneEncounter;
    // Update both get report subscriptions with the new zone
    this.atReports$.next({character: this.atCharacter, zoneEncounter});
    this.ctReports$.next({character: this.ctCharacter, zoneEncounter});
  }

  /**
   * Sets the provided character as the comparison target.
   * @param character -
   */
  comparisonTargetSelected(character: Character) {
    this.ctCharacter = character;
    // Trigger get comparison target reports
    this.ctReports$.next({character: this.ctCharacter, zoneEncounter: this.zoneEncounter});
  }
  ngOnDestroy() {
    if (this.atReports$) {
      this.atReports$.unsubscribe();
    }
    if (this.ctReports$) {
      this.ctReports$.unsubscribe();
    }
    if (this.atClassFilter$) {
      this.atClassFilter$.unsubscribe();
    }
  }
}
