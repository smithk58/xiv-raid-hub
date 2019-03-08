import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {ClassSearchService} from './class-search.service';
import {ClassToRole} from 'src/app/shared/Utils';

@Component({
  selector: 'app-class-search',
  templateUrl: './class-search.component.html',
  styleUrls: ['./class-search.component.css']
})
export class ClassSearchComponent implements OnInit {
  classToRole = ClassToRole;
  @Input() labelForId: string;
  @Input() fControl: FormControl;
  classes = [];
  constructor(private clService: ClassSearchService) { }
  ngOnInit() {
    // Populate the list of available classes
    this.clService.getClasses().subscribe((classes) => {
      this.classes = classes;
    });
  }

}
