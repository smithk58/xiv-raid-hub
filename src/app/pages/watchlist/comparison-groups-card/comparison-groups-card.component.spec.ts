import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonGroupsCardComponent } from './comparison-groups-card.component';

describe('ComparisonGroupsCardComponent', () => {
  let component: ComparisonGroupsCardComponent;
  let fixture: ComponentFixture<ComparisonGroupsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonGroupsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonGroupsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
