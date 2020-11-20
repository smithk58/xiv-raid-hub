import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserCharacter } from 'src/app/shared/api/xiv-raid-hub/models/user-character';
import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getUsersCharacters() {
    return this.http.get<UserCharacter[]>('/characters');
  }
  insertUserCharacter(character: Character) {
    return this.http.post<UserCharacter>('/characters', character);
  }
  updateUserCharacter(character: Character) {
    return this.http.put<UserCharacter>('/characters/' + character.id, character);
  }
  deleteUserCharacter(characterId: number) {
    return this.http.delete('/characters/' + characterId);
  }
  confirmCharacter(characterId: number) {
    return this.http.get<boolean>('characters/' + characterId + '/claim');
  }
  refreshCharacterInfo(characterId: number) {
    return this.http.get<{name?: string, server?: string}>('/characters/' + characterId + '/lodestone');
  }
}
