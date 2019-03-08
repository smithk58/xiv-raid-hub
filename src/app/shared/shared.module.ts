import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgSelectModule} from '@ng-select/ng-select';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CharacterSearchComponent} from './utility-components/character-search/character-search.component';
import { ClassSearchComponent } from './utility-components/class-search/class-search.component';

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
    CharacterSearchComponent,
    ClassSearchComponent
  ],
  exports: [
    FormsModule,
    NgbModule,
    NgSelectModule,
    FontAwesomeModule,
    CharacterSearchComponent,
    ClassSearchComponent
  ]
})
export class SharedModule { }
