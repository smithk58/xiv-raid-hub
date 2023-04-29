import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MyRaidComponent } from './my-raid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaidTimesComponent } from 'src/app/pages/my-raid/raid-times/raid-times.component';
import { ScheduleComponent } from 'src/app/pages/my-raid/schedule/schedule.component';

describe('MyRaidComponent', () => {
  let component: MyRaidComponent;
  let fixture: ComponentFixture<MyRaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ MyRaidComponent, RaidTimesComponent, ScheduleComponent ],
      providers: []
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
