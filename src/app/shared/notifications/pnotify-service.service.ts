import { Injectable } from '@angular/core';
import { PNotifyOptions } from './PNotifyOptions';

declare var PNotify: any;
declare var PNotifyButtons: any;

/**
 * This service is a wrapper for the PNotify notification framework (https://github.com/sciactive/pnotify). Any methods you wish to use from
 * the PNotify framework should get an equivalent wrapper method in this service that calls PNotify.<method>. This ensures we can better
 * test this service and can also be more aware of what functionality we're using from it throughout the code.Example usages at end of file.
 */
@Injectable({
  providedIn: 'root'
})
export class PNotifyService {
  constructor() {
    // Initialize p notify
    // eslint-disable-next-line
    PNotifyButtons;
    // Set default pnotify to bootstrap 4 styling
    PNotify.defaults.styling = 'bootstrap4';
  }
  // Calls PNotify.alert(options). See PNotify documentation for details.
  alert(options: PNotifyOptions) {
    options.icon = false;
    return PNotify.alert(options);
  }
  // Calls PNotify.info(options). See PNotify documentation for details.
  info(options: PNotifyOptions) {
    options.icon = false;
    return PNotify.info(options);
  }
  // Calls PNotify.success(options). See PNotify documentation for details.
  success(options: PNotifyOptions) {
    options.icon = false;
    return PNotify.success(options);
  }
  // Calls PNotify.error(options). See PNotify documentation for details.
  error(options: PNotifyOptions) {
    options.icon = false;
    return PNotify.error(options);
  }
}
