import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgSelectModule} from '@ng-select/ng-select';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SearchComponent} from './utility-components/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    FontAwesomeModule
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    FormsModule,
    NgbModule,
    NgSelectModule,
    FontAwesomeModule,
    SearchComponent
  ]
})
export class SharedModule { }
