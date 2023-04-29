import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { XivapiClientModule, XivapiService } from '@xivapi/angular-client';

import { AddEditRaidGroupComponent } from 'src/app/pages/configuration/modals/add-edit-raid-group/add-edit-raid-group.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AddEditRaidGroupComponent', () => {
  let component: AddEditRaidGroupComponent;
  let fixture: ComponentFixture<AddEditRaidGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, XivapiClientModule.forRoot()],
      declarations: [ AddEditRaidGroupComponent ],
      providers: [
        NgbActiveModal,
        XivapiService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRaidGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
