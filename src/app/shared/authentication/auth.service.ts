import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  /**
   * Executes a login attempt with the provided credentials.
   * @param {string} username - The username to authenticate with.
   * @param {string} password - The password to authenticate with.
   * @param {string} domain - The domain to authenticate against.
   * @returns {Observable<any>}
   */
  login(username: string, password: string, domain?: string) {
    // TODO
  }
}
