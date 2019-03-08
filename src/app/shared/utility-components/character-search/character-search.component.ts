import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import {CharacterSearchResult, CharacterSearchResultRow, Pagination} from '@xivapi/angular-client';
import {Subject, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap} from 'rxjs/operators';

import {CharacterSearchService} from './character-search.service';
import {Character} from 'src/app/shared/api/models/character';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.css']
})
export class CharacterSearchComponent implements OnInit, OnDestroy {
  @Output() selected: EventEmitter<Character> = new EventEmitter();
  @Input() clearOnSelect = false;
  @Input() fControl: FormControl;
  selectedCharacter: CharacterSearchResultRow;
  searchCharacterInput$ = new Subject<string>();
  lastInput: string;
  searchIsExecuting = false;

  characters: CharacterSearchResultRow[] = [];
  pagination: Pagination;
  constructor(private searchService: CharacterSearchService) { }

  ngOnInit() {
    // Setup auto search on change of search input
    this.searchCharacterInput$.pipe(
      debounceTime(1000), // 1 second
      map(term => term ? term.toLocaleLowerCase() : ''),
      distinctUntilChanged(),
      switchMap(input => {
        // Reset pagination between searches, and save the input for next page requests
        this.pagination = undefined;
        this.lastInput = input;
        // Return empty list if no search term or < 3 characters, otherwise execute character search
        if (!input || input.length < 3) {
          return of([]);
        } else {
          return this.search(input);
        }
      })
    ).subscribe( characters => {
      this.characters = characters;
    });
  }

  /**
   * Executed when the end of the dropdown is reached
   */
  onScrollToEnd() {
    // If we have pagination and a next page, retrieve the next page of characters and append it on
    if (this.pagination && this.pagination.PageNext) {
      this.search(this.lastInput, this.pagination.PageNext as number).subscribe( characters => {
        this.characters = this.characters.concat(characters);
      });
    }
  }

  /**
   * Executes a search, saves the pagination globally, and returns the characters.
   * @param searchTerm - The search term.
   * @param page - The page of matches to return.
   */
  search(searchTerm: string, page?: number) {
    this.searchIsExecuting = true;
    return this.searchService.searchCharacter(searchTerm, undefined, page).pipe(
      map((result: CharacterSearchResult) => {
        // Save pagination, return list of characters for first page
        this.pagination = result.Pagination;
        return result.Results;
      }),
      finalize(() => this.searchIsExecuting = false),
      catchError(() => of([])) // empty list on error
    );
  }
  onChange() {
    const selCharacter = this.fControl ? this.fControl.value : this.selectedCharacter;
    // Output a new character, then wipe the ng select
    const character: Character = !selCharacter ? null : {
      id: selCharacter.ID,
      name: selCharacter.Name,
      server: selCharacter.Server
  };
    this.selected.emit(character);
  }
  ngOnDestroy(): void {
    if (this.searchCharacterInput$) {
      this.searchCharacterInput$.unsubscribe();
    }
  }
}
