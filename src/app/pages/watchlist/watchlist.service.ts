import { Injectable } from '@angular/core';

import {XivapiService} from '@xivapi/angular-client';
import {BehaviorSubject} from 'rxjs';

import {FFLogsApiService} from 'src/app/shared/fflogs/fflogs-api.service';
import {Character} from 'src/app/shared/models/character';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  characters: BehaviorSubject<Character[]>;
  constructor(private xivAPI: XivapiService, private ffLogApi: FFLogsApiService) { }

  /**
   * Returns an observable of the list of friends for the current user.
   */
  getFriends() {
    // Initialize the characters from storage, or default to []
    if (!this.characters) {
      const storedCharacters = localStorage.getItem('friends');
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
    localStorage.setItem('friends', JSON.stringify(existingCharacters));
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
      localStorage.setItem('friends', JSON.stringify(existingCharacters));
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
      localStorage.setItem('friends', JSON.stringify(existingCharacters));
      // Update the character subject
      this.characters.next(existingCharacters);
    }
    return foundMatch;
  }
}
