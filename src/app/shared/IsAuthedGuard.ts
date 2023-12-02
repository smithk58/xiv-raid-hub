import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';

@Injectable()
export class IsAuthedGuard  {
  constructor(private router: Router, private userService: UserService, private pNotify: PNotifyService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.userService.getUserSession().pipe(map(user => {
      if (!user.isLoggedIn) {
        this.pNotify.error({text: 'You must be logged in to access this area.'});
        this.router.navigate(['']);
      }
      return user.isLoggedIn;
    }));
  }

}
