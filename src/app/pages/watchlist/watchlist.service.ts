import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {map, take} from 'rxjs/operators';

import {Character} from 'src/app/shared/api/models/character';
import {StorageKeys} from 'src/app/shared/importExport/StorageKeys';
import {CharacterGroup} from 'src/app/shared/api/models/character-group';
import {Utils} from 'src/app/shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  usersCharacters: BehaviorSubject<Character[]>;
  usersStatics: BehaviorSubject<CharacterGroup[]>;
  friends: BehaviorSubject<Character[]>;
  friendStatics: BehaviorSubject<CharacterGroup[]>;
  comparisonTargets: BehaviorSubject<Character[]>;
  comparisonStatics: BehaviorSubject<CharacterGroup[]>;
  constructor() { }

  /**
   * Returns a particular character from your friends, otherwise
   * @param characterId - The character id of the friend to return.
   */
  getFriend(characterId: number) {
    return this.getFriends().pipe(
      take(1),
      map( friends => friends.find(friend => friend.id === characterId))
    );
  }
  /**
   * Returns an observable of the list of friends for the current user.
   */
  getFriends() {
    // Initialize the characters from storage, or default to []
    if (!this.friends) {
      const storedCharacters = localStorage.getItem(StorageKeys.friends);
      const characters = storedCharacters ? JSON.parse(storedCharacters) : [];
      this.friends = new BehaviorSubject<Character[]>(characters);
    }
    return this.friends;
  }
  /**
   * Adds the character to the current users friends.
   * @param character - The character to add.
   */
  addFriend(character: Character) {
    this.addHelper(character, this.friends, StorageKeys.friends, false);
  }

  /**
   * Updates the specified character in the friend list, if found (matches on id).
   * @param character - The character to update.
   */
  updateFriend(character: Character) {
    return this.updateHelper(character, this.friends, StorageKeys.friends);
  }
  /**
   * Deletes the character with the specified id from the friend list, if found.
   * @param characterId - The character id to delete.
   */
  deleteFriend(characterId: number) {
    return this.deleteHelper(characterId, this.friends, StorageKeys.friends);
  }
  getStatic(groupId: string) {
    return this.getStatics().pipe(
      take(1),
      map( statics => statics.find(sStatic => sStatic.id === groupId))
    );
  }
  /**
   * Returns an observable of the list of statics for the current user.
   */
  getStatics() {
    // Initialize the characters from storage, or default to []
    if (!this.friendStatics) {
      const storedStatics = localStorage.getItem(StorageKeys.statics);
      const statics = storedStatics ? JSON.parse(storedStatics) : [];
      this.friendStatics = new BehaviorSubject<CharacterGroup[]>(statics);
    }
    return this.friendStatics;
  }

  /**
   * Adds the static to the existing list of statics.
   * @param nStatic - The static to add.
   */
  addStatic(nStatic: CharacterGroup) {
    this.addHelper(nStatic, this.friendStatics, StorageKeys.statics, true);
  }

  /**
   * Updates the specified static in the list of statics, if found (matches on id).
   * @param uStatic - The updated static.
   */
  updateStatic(uStatic: CharacterGroup) {
    return this.updateHelper(uStatic, this.friendStatics, StorageKeys.statics);
  }

  /**
   * Deletes the static with the specified id.
   * @param staticId - The static id to delete.
   */
  deleteStatic(staticId: string) {
    return this.deleteHelper(staticId, this.friendStatics, StorageKeys.statics);
  }
  /**
   * Returns an observable of the list of comparison targets for the current user.
   */
  getComparisonTargets() {
    // Initialize the comparison targets from storage, or default to []
    if (!this.comparisonTargets) {
      const storedCharacters = localStorage.getItem(StorageKeys.comparisonTargets);
      const characters = storedCharacters ? JSON.parse(storedCharacters) : [];
      this.comparisonTargets = new BehaviorSubject<Character[]>(characters);
    }
    return this.comparisonTargets;
  }
  /**
   * Adds the character to the current users comparison targets.
   * @param character - The character to add.
   */
  addComparisonTarget(character: Character) {
    this.addHelper(character, this.comparisonTargets, StorageKeys.comparisonTargets, false);
  }

  /**
   * Updates the specified character in the comparison target list, if found (matches on id).
   * @param character - The character to update.
   */
  updateComparisonTarget(character: Character) {
    return this.updateHelper(character, this.comparisonTargets, StorageKeys.comparisonTargets);
  }
  /**
   * Deletes the character with the specified id from the comparison target list, if found.
   * @param characterId - The character id to delete.
   */
  deleteComparisonTarget(characterId: number) {
    return this.deleteHelper(characterId, this.comparisonTargets, StorageKeys.comparisonTargets);
  }
  /**
   * Returns an observable of the list of comparison statics for the current user.
   */
  getComparisonStatics() {
    // Initialize the comparison statics from storage, or default to []
    if (!this.comparisonStatics) {
      const storedCharacters = localStorage.getItem(StorageKeys.comparisonStatics);
      const characters = storedCharacters ? JSON.parse(storedCharacters) : [];
      this.comparisonStatics = new BehaviorSubject<CharacterGroup[]>(characters);
    }
    return this.comparisonStatics;
  }
  /**
   * Adds the group to the current users comparison statics.
   * @param group - The static to add.
   */
  addComparisonStatic(group: CharacterGroup) {
    this.addHelper(group, this.comparisonStatics, StorageKeys.comparisonStatics, true);
  }

  /**
   * Updates the specified static in the comparison statics list, if found (matches on id).
   * @param group - The group to update.
   */
  updateComparisonStatic(group: CharacterGroup) {
    return this.updateHelper(group, this.comparisonStatics, StorageKeys.comparisonStatics);
  }
  /**
   * Deletes the group with the specified id from the comparison staics list, if found.
   * @param groupId - The group id to delete.
   */
  deleteComparisonStatic(groupId: string) {
    return this.deleteHelper(groupId, this.comparisonStatics, StorageKeys.comparisonStatics);
  }
  private addHelper(item: Partial<{id: number | string, name: string}>, targetList: BehaviorSubject<any>, storageKey: StorageKeys,
                    generateId: boolean
  ) {
    // Assign an ID to the new item
    if (generateId) {
      item.id = Utils.newGuid();
    }
    // Add this item to the existing array and save it to storage
    const existing = targetList.getValue();
    existing.push(item);
    // Keep sorted by name
    existing.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    localStorage.setItem(storageKey, JSON.stringify(existing));
    targetList.next(existing);
  }
  private updateHelper(updatedItem: Partial<{id: string | number, name: string}>, targetList: BehaviorSubject<any>, storageKey: StorageKeys
  ) {
    // Update this group in the existing array and save it to storage
    const existing = targetList.getValue();
    const existingIndex = existing.findIndex(c => c.id === updatedItem.id);
    const foundMatch = existingIndex >= 0;
    if (foundMatch) {
      existing.splice(existingIndex, 1, updatedItem);
      localStorage.setItem(storageKey, JSON.stringify(existing));
      targetList.next(existing);
    }
    return foundMatch;
  }
  private deleteHelper(idToDelete: string | number, targetList: BehaviorSubject<any>, storageKey: StorageKeys) {
    const existing = targetList.getValue();
    const existingIndex = existing.findIndex(c => c.id === idToDelete);
    const foundMatch = existingIndex >= 0;
    if (foundMatch) {
      existing.splice(existingIndex, 1);
      localStorage.setItem(storageKey, JSON.stringify(existing));
      targetList.next(existing);
    }
    return foundMatch;
  }
}
