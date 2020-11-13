import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTargetComponent } from './alarm-target.component';

describe('AlarmTargetComponent', () => {
  let component: AlarmTargetComponent;
  let fixture: ComponentFixture<AlarmTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
