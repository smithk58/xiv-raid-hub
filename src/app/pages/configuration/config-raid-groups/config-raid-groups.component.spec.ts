import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRaidGroupsComponent } from 'src/app/pages/configuration/config-raid-groups/config-raid-groups.component';

describe('ConfigStaticsComponent', () => {
  let component: ConfigRaidGroupsComponent;
  let fixture: ComponentFixture<ConfigRaidGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigRaidGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRaidGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
