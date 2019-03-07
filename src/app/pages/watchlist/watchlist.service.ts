import { Injectable } from '@angular/core';

import {XivapiService} from '@xivapi/angular-client';
import {BehaviorSubject} from 'rxjs';

import {FFLogsApiService} from 'src/app/shared/fflogs/fflogs-api.service';
import {Character} from 'src/app/shared/models/character';
import {StorageKeys} from 'src/app/shared/importExport/StorageKeys';
import {CharacterGroup} from 'src/app/shared/models/character-group';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  characters: BehaviorSubject<Character[]>;
  statics: BehaviorSubject<CharacterGroup[]>;
  constructor(private xivAPI: XivapiService, private ffLogApi: FFLogsApiService) { }

  /**
   * Returns an observable of the list of friends for the current user.
   */
  getFriends() {
    // Initialize the characters from storage, or default to []
    if (!this.characters) {
      const storedCharacters = localStorage.getItem(StorageKeys.friends);
      const characters = storedCharacters ? JSON.parse(storedCharacters) : [];
      this.characters = new BehaviorSubject<Character[]>(characters);
    }
    return this.characters;
  }
  /**
   * Adds the character to the current users friends.
   * @param character - The character to add.
   */
  addFriend(character: Character) {
    // Add this character to the existing array and save it to storage
    const existingCharacters = this.characters.getValue();
    existingCharacters.push(character);
    // Keep characters sorted by name
    existingCharacters.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    localStorage.setItem(StorageKeys.friends, JSON.stringify(existingCharacters));
    // Update the character subject
    this.characters.next(existingCharacters);
  }

  /**
   * Updates the specified character in the friend list, if found (matches on id).
   * @param character - The character to update.
   */
  updateFriend(character: Character) {
    // Update this character in the existing array and save it to storage
    const existingCharacters = this.characters.getValue();
    const existingCharacterIndex = existingCharacters.findIndex(c => c.id === character.id);
    const foundMatch = existingCharacterIndex >= 0;
    if (foundMatch) {
      existingCharacters.splice(existingCharacterIndex, 1, character);
      localStorage.setItem(StorageKeys.friends, JSON.stringify(existingCharacters));
      // Update the character subject
      this.characters.next(existingCharacters);
    }
    return foundMatch;
  }
  /**
   * Deletes the character with the specified id from the friend list, if found.
   * @param characterId - The character id to delete.
   */
  deleteFriend(characterId: number) {
    const existingCharacters = this.characters.getValue();
    const existingCharacterIndex = existingCharacters.findIndex(c => c.id === characterId);
    const foundMatch = existingCharacterIndex >= 0;
    if (foundMatch) {
      existingCharacters.splice(existingCharacterIndex, 1);
      localStorage.setItem(StorageKeys.friends, JSON.stringify(existingCharacters));
      // Update the character subject
      this.characters.next(existingCharacters);
    }
    return foundMatch;
  }
  getStatics() {
    // Initialize the characters from storage, or default to []
    if (!this.statics) {
      const storedStatics = localStorage.getItem(StorageKeys.statics);
      const statics = storedStatics ? JSON.parse(storedStatics) : [];
      this.statics = new BehaviorSubject<CharacterGroup[]>(statics);
    }
    return this.statics;
  }
  addStatic(nStatic: CharacterGroup) {
    // Add this static to the existing array and save it to storage
    const existingStatics = this.statics.getValue();
    existingStatics.push(nStatic);
    // Keep statics sorted by name
    existingStatics.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    localStorage.setItem(StorageKeys.statics, JSON.stringify(existingStatics));
    // Update the character subject
    this.statics.next(existingStatics);
  }
  updateStatic(uStatic: CharacterGroup) {
    // Update this character in the existing array and save it to storage
    const existingStatics = this.statics.getValue();
    const existingStaticIndex = existingStatics.findIndex(c => c.id === uStatic.id);
    const foundMatch = existingStaticIndex >= 0;
    if (foundMatch) {
      existingStatics.splice(existingStaticIndex, 1, uStatic);
      localStorage.setItem(StorageKeys.statics, JSON.stringify(existingStatics));
      // Update the character subject
      this.statics.next(existingStatics);
    }
    return foundMatch;
  }
  deleteStatic(staticId: string) {
    const existingStatics = this.statics.getValue();
    const existingStaticIndex = existingStatics.findIndex(c => c.id === staticId);
    const foundMatch = existingStaticIndex >= 0;
    if (foundMatch) {
      existingStatics.splice(existingStaticIndex, 1);
      localStorage.setItem(StorageKeys.statics, JSON.stringify(existingStatics));
      // Update the character subject
      this.statics.next(existingStatics);
    }
    return foundMatch;
  }
}
