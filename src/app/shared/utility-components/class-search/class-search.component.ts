import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ClassToRole } from 'src/app/shared/Utils';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { FFLogsApiService } from 'src/app/shared/api/fflogs/fflogs-api.service';

@Component({
  selector: 'app-class-search',
  templateUrl: './class-search.component.html',
  styleUrls: ['./class-search.component.css']
})
export class ClassSearchComponent implements OnInit {
  classToRole = ClassToRole;
  @Input() labelForId: string;
  @Input() fControl: FormControl;
  @Input() appendTo: string;
  classes = [];
  constructor(private notify: PNotifyService, private fflogsService: FFLogsApiService) { }
  ngOnInit() {
    // Populate the list of available classes
    this.fflogsService.getClasses().subscribe((classes) => {
      this.classes = classes;
    }, (error) => {
      this.notify.error({text: 'Unable to get classes ' + error});
    });
  }

}
