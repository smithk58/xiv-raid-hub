import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgSelectModule} from '@ng-select/ng-select';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {CharacterSearchComponent} from './utility-components/character-search/character-search.component';
import { ClassSearchComponent } from './utility-components/class-search/class-search.component';
import { ThemeSelectorComponent } from './utility-components/theme-selector/theme-selector.component';
import { CharacterSelectComponent } from './utility-components/character-select/character-select.component';
import { GroupSelectComponent } from './utility-components/group-select/group-select.component';

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
    ClassSearchComponent,
    ThemeSelectorComponent,
    CharacterSelectComponent,
    GroupSelectComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    FontAwesomeModule,
    CharacterSearchComponent,
    ClassSearchComponent,
    ThemeSelectorComponent,
    CharacterSelectComponent
  ]
})
export class SharedModule { }
