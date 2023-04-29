import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmCharacterComponent } from 'src/app/pages/configuration/modals/confirm-character/confirm-character.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ConfirmCharacterComponent', () => {
  let component: ConfirmCharacterComponent;
  let fixture: ComponentFixture<ConfirmCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      declarations: [ ConfirmCharacterComponent ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
