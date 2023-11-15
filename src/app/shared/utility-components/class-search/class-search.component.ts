import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ClassToRole } from 'src/app/shared/Utils';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { FFService } from 'src/app/shared/api/xiv-raid-hub/ff.service';

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
  classes: string[] = [];
  constructor(private notify: PNotifyService, private ffService: FFService) { }
  ngOnInit() {
    // Populate the list of available classes
    this.ffService.getClasses().subscribe((classes) => {
      this.classes = classes;
    }, (error) => {
      this.notify.error({text: 'Unable to get classes ' + error});
    });
  }

}
