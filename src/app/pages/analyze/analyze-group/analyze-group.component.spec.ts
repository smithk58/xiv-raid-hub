import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AnalyzeGroupComponent } from './analyze-group.component';
import { EncounterToolbarComponent } from 'src/app/pages/analyze/shared/encounter-toolbar/encounter-toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AnalyzeGroupComponent', () => {
  let component: AnalyzeGroupComponent;
  let fixture: ComponentFixture<AnalyzeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [AnalyzeGroupComponent, EncounterToolbarComponent]
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
