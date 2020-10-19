import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAlarmComponent } from './add-edit-alarm.component';

describe('AddEditAlarmComponent', () => {
  let component: AddEditAlarmComponent;
  let fixture: ComponentFixture<AddEditAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
