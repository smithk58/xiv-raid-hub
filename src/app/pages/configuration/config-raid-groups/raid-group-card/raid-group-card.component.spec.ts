import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidGroupCardComponent } from 'src/app/pages/configuration/config-raid-groups/raid-group-card/raid-group-card.component';

describe('StaticsCardComponent', () => {
  let component: RaidGroupCardComponent;
  let fixture: ComponentFixture<RaidGroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidGroupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
