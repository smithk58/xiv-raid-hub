import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService} from '../auth.service';
import {PNotifyService} from '../../notifications/pnotify-service.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  loginExecuting = false;
  constructor(private activeModal: NgbActiveModal, private authService: AuthService, private pNotify: PNotifyService) { }

  attemptLogin() {
    this.loginExecuting = true;
    /*this.authService.login(this.username, this.password).subscribe(res => {
      // Old login service returns a success w/ sys_error_msg defined if the login failed, otherwise the login was a success
      if (res && res.sys_error_msg) {
        this.pNotify.error({text: res.sys_error_msg});
      } else {
        this.activeModal.close(true);
      }
    }, (err) => {
      this.pNotify.error({text: err});
    },
    () => {
      this.loginExecuting = false;
    });*/
  }

  closeModal() {
    this.activeModal.dismiss(false);
  }
}
