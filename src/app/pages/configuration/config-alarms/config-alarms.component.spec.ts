import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAlarmsComponent } from './config-alarms.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BASE_API_URL } from 'src/app/api-injection-token';
import { environment } from 'src/environments/environment';

describe('ConfigAlarmsComponent', () => {
  let component: ConfigAlarmsComponent;
  let fixture: ComponentFixture<ConfigAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      declarations: [ ConfigAlarmsComponent ],
      providers: [
        NgbActiveModal,
        { provide: BASE_API_URL, useValue: environment.baseHref }
      ]
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
