import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ComparisonsCardComponent } from 'src/app/pages/configuration/config-characters/comparisons-card/comparisons-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ComparisonsCardComponent', () => {
  let component: ComparisonsCardComponent;
  let fixture: ComponentFixture<ComparisonsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
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
