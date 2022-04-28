import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FflogsRankingComponent } from './fflogs-ranking.component';

describe('FflogsRankingComponent', () => {
  let component: FflogsRankingComponent;
  let fixture: ComponentFixture<FflogsRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FflogsRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FflogsRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});