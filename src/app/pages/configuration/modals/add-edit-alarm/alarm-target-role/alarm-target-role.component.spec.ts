import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AlarmTargetRoleComponent } from './alarm-target-role.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AlarmTargetRoleComponent', () => {
  let component: AlarmTargetRoleComponent;
  let fixture: ComponentFixture<AlarmTargetRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, SharedModule ],
      declarations: [ AlarmTargetRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmTargetRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
