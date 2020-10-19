import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddEditAlarmComponent } from './add-edit-alarm.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BASE_API_URL } from 'src/app/api-injection-token';
import { environment } from 'src/environments/environment';

describe('AddEditAlarmComponent', () => {
  let component: AddEditAlarmComponent;
  let fixture: ComponentFixture<AddEditAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      declarations: [ AddEditAlarmComponent ],
      providers: [
        NgbActiveModal,
        { provide: BASE_API_URL, useValue: environment.baseHref }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
