import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigRaidGroupsComponent } from 'src/app/pages/configuration/config-raid-groups/config-raid-groups.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaidGroupCardComponent } from 'src/app/pages/configuration/config-raid-groups/raid-group-card/raid-group-card.component';

describe('ConfigRaidGroupsComponent', () => {
  let component: ConfigRaidGroupsComponent;
  let fixture: ComponentFixture<ConfigRaidGroupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ ConfigRaidGroupsComponent, RaidGroupCardComponent],
      providers: []
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
