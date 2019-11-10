import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStaticsComponent } from './users-statics.component';

describe('UsersStaticsComponent', () => {
  let component: UsersStaticsComponent;
  let fixture: ComponentFixture<UsersStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
