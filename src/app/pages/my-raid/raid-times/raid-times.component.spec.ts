import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidTimesComponent } from './raid-times.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RaidTimesComponent', () => {
  let component: RaidTimesComponent;
  let fixture: ComponentFixture<RaidTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ RaidTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
