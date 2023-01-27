/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as appliedPromotions from '../../../helpers/applied-promotions';
import { viewportContext } from '../../../helpers/viewport-context';

context('Applied promotions', { testIsolation: false }, () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.clearAllLocalStorage();
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.requireLoggedIn();
    });

    // Core test. Repeat in mobile.
    appliedPromotions.testPromotionsForLoggedInUser();
  });
});
