import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { XivapiClientModule, XivapiService } from '@xivapi/angular-client';

import { AddEditCharacterComponent } from './add-edit-character.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AddEditCharacterComponent', () => {
  let component: AddEditCharacterComponent;
  let fixture: ComponentFixture<AddEditCharacterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        XivapiClientModule.forRoot()
      ],
      declarations: [ AddEditCharacterComponent ],
      providers: [NgbActiveModal, XivapiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
