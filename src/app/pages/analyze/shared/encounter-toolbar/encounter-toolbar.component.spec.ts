import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterToolbarComponent } from './encounter-toolbar.component';

describe('EncounterToolbarComponent', () => {
  let component: EncounterToolbarComponent;
  let fixture: ComponentFixture<EncounterToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
