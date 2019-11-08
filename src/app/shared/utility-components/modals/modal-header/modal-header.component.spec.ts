import { TestBed } from '@angular/core/testing';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as axe from 'axe-core';
import {configureTestSuite, createTestContext, TestCtx} from 'ng-bullet';

import { ModalHeaderComponent } from 'src/app/shared/utility-components/modals/modal-header/modal-header.component';
import {SharedModule} from 'src/app/shared/shared.module';

describe('ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;
  let testContext: TestCtx<ModalHeaderComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule],
      declarations: [],
      providers: [ NgbActiveModal ]
    });
  });
  beforeEach(() => {
    testContext = createTestContext(ModalHeaderComponent);
    component = testContext.component;
    testContext.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should not have wcagA/AA a11y errors', (done) => {
    const ele = testContext.element;
    axe.run(ele, { runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    }).then((results) => {
      if (results.violations.length > 0) { console.error(results.violations); }
      expect(results.violations.length).toBe(0); done();
    });
  });
});
