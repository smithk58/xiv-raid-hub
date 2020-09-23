import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RaidGroupCardComponent } from 'src/app/pages/configuration/config-raid-groups/raid-group-card/raid-group-card.component';
import { BASE_API_URL } from 'src/app/api-injection-token';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RaidGroupsCardComponent', () => {
  let component: RaidGroupCardComponent;
  let fixture: ComponentFixture<RaidGroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ RaidGroupCardComponent ],
      providers: [
        { provide: BASE_API_URL, useValue: environment.baseHref }
      ],
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
