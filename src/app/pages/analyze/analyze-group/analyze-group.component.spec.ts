import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeGroupComponent } from './analyze-group.component';

describe('AnalyzeGroupComponent', () => {
  let component: AnalyzeGroupComponent;
  let fixture: ComponentFixture<AnalyzeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
