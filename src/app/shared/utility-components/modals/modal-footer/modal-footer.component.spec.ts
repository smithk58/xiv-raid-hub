import {  TestBed } from '@angular/core/testing';

import {configureTestSuite, createTestContext, TestCtx} from 'ng-bullet';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as axe from 'axe-core';

import { ModalFooterComponent } from 'src/app/shared/utility-components/modals/modal-footer/modal-footer.component';
import {SharedModule} from 'src/app/shared/shared.module';

describe('ModalFooterComponent', () => {
  let component: ModalFooterComponent;
  let testContext: TestCtx<ModalFooterComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule],
      declarations: [],
      providers: [ NgbActiveModal ]
    });
  });
  beforeEach(() => {
    testContext = createTestContext(ModalFooterComponent);
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
