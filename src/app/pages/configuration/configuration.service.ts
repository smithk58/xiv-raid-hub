import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';
import { StorageKeys } from 'src/app/shared/importExport/StorageKeys';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { Utils } from 'src/app/shared/Utils';
import { HttpClient } from '@angular/common/http';
import { UserSession } from 'src/app/shared/api/xiv-raid-hub/models/user-session';
import { WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  usersCharacters: BehaviorSubject<Character[]>;
  friends: BehaviorSubject<Character[]>;
  friendStatics: BehaviorSubject<RaidGroup[]>;
  comparisonTargets: BehaviorSubject<Character[]>;
  comparisonStatics: BehaviorSubject<RaidGroup[]>;
  constructor(private http: HttpClient) { }
  getUsersCharacters() {
    return this.usersCharacters = this.getHelper(this.usersCharacters, StorageKeys.usersCharacters);
  }
  addUserCharacter(character: Character) {
    this.addHelper(character, this.usersCharacters, StorageKeys.usersCharacters, true);
  }
  updateUserCharacter(character: Character) {
    return this.updateHelper(character, this.usersCharacters, StorageKeys.usersCharacters);
  }
  deleteUserCharacter(characterId: number) {
    return this.deleteHelper(characterId, this.usersCharacters, StorageKeys.usersCharacters);
  }
  getRaidGroupsRaidTimes(raidGroupId: number) {
    return this.http.get<WeeklyRaidTime[]>('/raid-groups/' + raidGroupId + '/raidTimes');
  }
  updateRaidGroupsRaidTimes(raidGroupId: number, weeklyRaidTimes: WeeklyRaidTime[]) {
    return this.http.put<WeeklyRaidTime[]>('/raid-groups/' + raidGroupId + '/raidTimes', weeklyRaidTimes);
  }
  /**
   * Returns a particular character from your friends, otherwise
   * @param characterId - The character id of the friend to return.
   */
  getFriend(characterId: number) { // TODO Should be moved to analyzer service and check friends + users chars
    return this.getFriends().pipe(
      take(1),
      map( friends => friends.find(friend => friend.id === characterId))
    );
  }
  /**
   * Returns an observable of the list of friends for the current user.
   */
  getFriends() {
    return this.friends = this.getHelper(this.friends, StorageKeys.friends);
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
  getFriendStatic(groupId: string) { // TODO Should be moved to analyzer service and check friends statics  + users statics
    return this.getFriendStatics().pipe(
      take(1),
      map( statics => statics.find(sStatic => sStatic.id === groupId))
    );
  }
  /**
   * Returns an observable of the list of statics for the current user.
   */
  getFriendStatics() {
    return this.friendStatics = this.getHelper(this.friendStatics, StorageKeys.friendsStatics);
  }

  /**
   * Adds the static to the existing list of statics.
   * @param nStatic - The static to add.
   */
  addFriendStatic(nStatic: RaidGroup) {
    this.addHelper(nStatic, this.friendStatics, StorageKeys.friendsStatics, true);
  }

  /**
   * Updates the specified static in the list of statics, if found (matches on id).
   * @param uStatic - The updated static.
   */
  updateFriendStatic(uStatic: RaidGroup) {
    return this.updateHelper(uStatic, this.friendStatics, StorageKeys.friendsStatics);
  }

  /**
   * Deletes the static with the specified id.
   * @param staticId - The static id to delete.
   */
  deleteFriendStatic(staticId: string) {
    return this.deleteHelper(staticId, this.friendStatics, StorageKeys.friendsStatics);
  }
  /**
   * Returns an observable of the list of comparison targets for the current user.
   */
  getComparisonTargets() {
    return this.comparisonTargets = this.getHelper(this.comparisonTargets, StorageKeys.comparisonTargets);
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
    return this.comparisonStatics = this.getHelper(this.comparisonStatics, StorageKeys.comparisonStatics);
  }
  /**
   * Adds the group to the current users comparison statics.
   * @param group - The static to add.
   */
  addComparisonStatic(group: RaidGroup) {
    this.addHelper(group, this.comparisonStatics, StorageKeys.comparisonStatics, true);
  }

  /**
   * Updates the specified static in the comparison statics list, if found (matches on id).
   * @param group - The group to update.
   */
  updateComparisonStatic(group: RaidGroup) {
    return this.updateHelper(group, this.comparisonStatics, StorageKeys.comparisonStatics);
  }
  /**
   * Deletes the group with the specified id from the comparison staics list, if found.
   * @param groupId - The group id to delete.
   */
  deleteComparisonStatic(groupId: string) {
    return this.deleteHelper(groupId, this.comparisonStatics, StorageKeys.comparisonStatics);
  }
  private getHelper(targetList: BehaviorSubject<any>, storageKey: StorageKeys) {
    // Initialize from storage, or default to []
    if (!targetList) {
      const storedList = localStorage.getItem(storageKey);
      const list = storedList ? JSON.parse(storedList) : [];
      targetList = new BehaviorSubject<[]>(list);
    }
    return targetList;
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
