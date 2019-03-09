import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStaticComponent } from './add-edit-static.component';

describe('AddEditStaticComponent', () => {
  let component: AddEditStaticComponent;
  let fixture: ComponentFixture<AddEditStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
