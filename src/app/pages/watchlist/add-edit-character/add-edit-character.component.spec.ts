import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCharacterComponent } from './add-edit-character.component';

describe('AddEditCharacterComponent', () => {
  let component: AddEditCharacterComponent;
  let fixture: ComponentFixture<AddEditCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCharacterComponent ]
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
