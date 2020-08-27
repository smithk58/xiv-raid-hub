import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule} from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CharacterSearchComponent } from './utility-components/character-search/character-search.component';
import { ClassSearchComponent } from './utility-components/class-search/class-search.component';
import { ThemeSelectorComponent } from './utility-components/theme-selector/theme-selector.component';
import { CharacterSelectComponent } from './utility-components/character-select/character-select.component';
import { ModalHeaderComponent } from 'src/app/shared/utility-components/modals/modal-header/modal-header.component';
import { ModalFooterComponent } from 'src/app/shared/utility-components/modals/modal-footer/modal-footer.component';

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
    ModalHeaderComponent,
    ModalFooterComponent
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
    CharacterSelectComponent,
    ModalHeaderComponent,
    ModalFooterComponent
  ]
})
export class SharedModule { }
