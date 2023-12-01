import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClassSearchComponent } from './class-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl } from '@angular/forms';

describe('ClassSearchComponent', () => {
  let component: ClassSearchComponent;
  let fixture: ComponentFixture<ClassSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      declarations: [ ClassSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSearchComponent);
    component = fixture.componentInstance;
    component.fControl = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
