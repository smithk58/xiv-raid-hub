import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoModalComponent } from 'src/app/shared/utility-components/modals/yes-no-modal/yes-no-modal.component';

describe('YesNoModalComponent', () => {
  let component: YesNoModalComponent;
  let fixture: ComponentFixture<YesNoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
