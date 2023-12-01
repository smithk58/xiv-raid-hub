import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RaidGroupCardComponent } from 'src/app/pages/configuration/config-raid-groups/raid-group-card/raid-group-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RaidGroupsCardComponent', () => {
  let component: RaidGroupCardComponent;
  let fixture: ComponentFixture<RaidGroupCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ RaidGroupCardComponent ],
      providers: [],
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
