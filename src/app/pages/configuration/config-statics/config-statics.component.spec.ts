import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigStaticsComponent } from './config-statics.component';

describe('ConfigStaticsComponent', () => {
  let component: ConfigStaticsComponent;
  let fixture: ComponentFixture<ConfigStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
