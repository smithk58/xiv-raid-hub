import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRaidGroupComponent } from 'src/app/pages/configuration/modals/add-edit-raid-group/add-edit-raid-group.component';

describe('AddEditStaticComponent', () => {
  let component: AddEditRaidGroupComponent;
  let fixture: ComponentFixture<AddEditRaidGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRaidGroupComponent ]
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
