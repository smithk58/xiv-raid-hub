import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  /**
   * Executes a login attempt with the provided credentials.
   * @param username - The username to authenticate with.
   * @param  password - The password to authenticate with.
   * @param domain - The domain to authenticate against.
   */
  login(username: string, password: string, domain?: string) {
    // TODO
  }
}
