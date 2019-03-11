import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeCharacterComponent } from './analyze-character.component';

describe('AnalyzeCharacterComponent', () => {
  let component: AnalyzeCharacterComponent;
  let fixture: ComponentFixture<AnalyzeCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
