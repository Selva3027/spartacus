import {
  mockLocation,
  LOCATORS as L,
} from '../../../helpers/pickup-in-store-utils';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Pickup delivery options', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.cxConfig({
        context: {
          baseSite: ['apparel-uk-spa'],
          currency: ['GBP'],
        },
      });
      cy.visit('/product/300310300', mockLocation(53, 0));
    });

    it('Delivery selected by default. Click Pickup. Pickup radio becomes selected. Dismiss dialog witout picking a store. Delivery is selected', () => {
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should(
        'have.attr',
        'aria-checked',
        'true'
      );
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).should(
        'have.attr',
        'aria-checked',
        'false'
      );
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.DIALOG_CLOSE).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should(
        'have.attr',
        'aria-checked',
        'true'
      );
    });

    it('No store is selected, clicking on BOPIS radio button opens modal, can pick a store, clicking on BOPIS radio no longer opens modal, but clicking on "Select Store" link does open modal', () => {
      cy.get(L.BOPIS_TAG).should('exist');
      cy.get(L.SELECT_STORE_LINK).should('have.text', 'Select Store');
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.USE_MY_LOCATION).click();
      cy.get(L.PICKUP_FROM_HERE_BUTTON_NOTTINGHAM_ICE_CENTER).click();
      cy.get(L.SELECT_STORE_LINK).should('have.text', 'Change Store');
      cy.get(L.SELECT_STORE_LINK).should('not.have.text', 'Select Store');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).click();
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_IN_STORE_MODAL).should('not.exist');
      cy.get(L.SELECT_STORE_LINK).click();
      cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');
    });

    it('should open the pickup locations dialog, and dialog should be closeable', () => {
      cy.get(L.BOPIS_TAG).should('exist');
      cy.get(L.PICKUP_OPTIONS_RADIO_DELIVERY).should(
        'have.attr',
        'aria-checked',
        'true'
      );
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');
      cy.get(L.DIALOG_CLOSE).click();
      cy.get(L.PICKUP_IN_STORE_MODAL).should('not.exist');
    });

    it('should filter out stores with no stock when "Hide out of stock options" is checked', () => {
      cy.get(L.BOPIS_TAG).should('exist');
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');
      cy.get(L.USE_MY_LOCATION).click();
      cy.get('cx-store').should('have.length', 20);
      cy.get(L.HIDE_OUT_OF_STOCK_CHECK_BOX).click();
      cy.get('cx-store').should('have.length', 10);
    });

    it('uses the search term entered if Find Stores button clicked ', () => {
      cy.get(L.BOPIS_TAG).should('exist');
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');
      cy.get(L.SEARCH_LOCATION_TEXTBOX).type('Maidenhead');
      cy.intercept({
        method: 'GET',
        url: '/occ/v2/apparel-uk-spa/products/300310300/stock*',
      }).as('apiSearchStores');
      cy.get(L.FIND_STORES_BUTTON).click();
      cy.wait('@apiSearchStores').then((interception) => {
        expect(interception.request.url).contain('location=Maidenhead');
      });
    });

    it('uses the location if "Use My Location" link clicked ', () => {
      cy.get(L.BOPIS_TAG).should('exist');
      cy.get(L.PICKUP_OPTIONS_RADIO_PICKUP).click();
      cy.get(L.PICKUP_IN_STORE_MODAL).should('exist');

      cy.intercept({
        method: 'GET',
        url: '/occ/v2/apparel-uk-spa/products/300310300/stock*',
      }).as('apiSearchStores');
      cy.get(L.USE_MY_LOCATION).click();
      cy.wait('@apiSearchStores').then((interception) => {
        expect(interception.request.url).contain('latitude=53&longitude=0');
      });
    });

    // TODO Be able to select a store for pickup, and then change the store for pickup
  });
});
