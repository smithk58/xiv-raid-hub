import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStaticsComponent } from './my-statics.component';

describe('MyStaticsComponent', () => {
  let component: MyStaticsComponent;
  let fixture: ComponentFixture<MyStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
