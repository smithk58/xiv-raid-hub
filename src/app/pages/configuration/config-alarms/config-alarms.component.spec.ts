import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAlarmsComponent } from './config-alarms.component';

describe('ConfigAlarmsComponent', () => {
  let component: ConfigAlarmsComponent;
  let fixture: ComponentFixture<ConfigAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
