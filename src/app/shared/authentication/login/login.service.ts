import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginInProgress = false;
  modalResultObservable: Observable<boolean>;
  constructor(private http: HttpClient, private modalService: NgbModal, private authService: AuthService) { }
  /**
   * Prompts the user for login credentials. Returns true if they successfully logged in, and false if they gave up.
   * @returns {Observable<boolean>}
   */
  promptLogin() {
    // If this is the first prompt for login, create an observable over the result of the modal.
    if (!this.loginInProgress) {
      this.loginInProgress = true;
      const loginModal = this.modalService.open(LoginComponent, {backdrop: 'static', keyboard: false});
      const loginResult = loginModal.result.then(() => {
        this.loginInProgress = false;
        return true;
      }, () => {
        this.loginInProgress = false;
        return false;
      });
      // Wrap the promise result from the modal in an observable, other requests for login prompt will receive this same observable
      this.modalResultObservable = from(loginResult);
    }
    return this.modalResultObservable;
  }
}
