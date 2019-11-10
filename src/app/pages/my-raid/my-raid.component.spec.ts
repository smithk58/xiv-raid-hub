import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRaidComponent } from './my-raid.component';

describe('MyRaidComponent', () => {
  let component: MyRaidComponent;
  let fixture: ComponentFixture<MyRaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
