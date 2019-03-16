import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLinksComponent } from './report-links.component';

describe('ReportLinksComponent', () => {
  let component: ReportLinksComponent;
  let fixture: ComponentFixture<ReportLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
