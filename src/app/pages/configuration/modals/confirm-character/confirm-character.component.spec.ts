import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCharacterComponent } from 'src/app/pages/configuration/modals/confirm-character/confirm-character.component';

describe('ConfirmCharacterComponent', () => {
  let component: ConfirmCharacterComponent;
  let fixture: ComponentFixture<ConfirmCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCharacterComponent ]
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
