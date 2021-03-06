import * as productSearchPricingFlow from '../../../helpers/product-search-pricing-flow';
import { formats } from '../../../sample-data/viewports';
import { waitForHomePage } from '../../../helpers/homepage';

context(
  `${formats.mobile.width + 1}p resolution - Product search pricing flow`,
  () => {
    before(() => {
      cy.visit('/');
    });

    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    describe('Product search', () => {
      it('should be able to search product and sort by price', () => {
        waitForHomePage();

        productSearchPricingFlow.productPricingFlow();
      });
    });
  }
);
