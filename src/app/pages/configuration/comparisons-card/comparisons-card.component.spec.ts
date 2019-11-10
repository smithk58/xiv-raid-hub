import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonsCardComponent } from 'src/app/pages/configuration/comparisons-card/comparisons-card.component';

describe('ComparisonsCardComponent', () => {
  let component: ComparisonsCardComponent;
  let fixture: ComponentFixture<ComparisonsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
