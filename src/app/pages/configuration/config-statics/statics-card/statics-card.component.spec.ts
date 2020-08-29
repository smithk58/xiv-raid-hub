import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsCardComponent } from './statics-card.component';

describe('StaticsCardComponent', () => {
  let component: StaticsCardComponent;
  let fixture: ComponentFixture<StaticsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
