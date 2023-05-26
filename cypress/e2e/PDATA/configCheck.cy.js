/// <reference types="cypress" />

context(
  'Configuration Verification',
  {
    scrollBehavior: 'center',
  },
  () => {
    it('Log-in the page', () => {
      // https://on.cypress.io/go
      cy.visit('https://test.buyandsell.gc.ca/procurement-data/user');
      cy.get('#edit-name').type('pdata.admin');
      cy.get('#edit-pass').type('test123');
      cy.get('.field-prefix')
        .invoke('text')
        .then((text1) => {
          let arr = text1.replace('=', '').replace(/\s/g, '').split('+');
          let sum = parseInt(arr[0]) + parseInt(arr[1]);
          cy.get('#edit-captcha-response').type(sum);
        });
      cy.get('#edit-submit').click();
      cy.visit(
        'https://test.buyandsell.gc.ca/procurement-data/admin/structure/feeds/tender_notice_rss_crawler/settings/localFeedsEntityProcessor',
      );
      cy.get('#edit-update-existing-2').should('be.checked');
      cy.get('#edit-skip-hash-check').should('be.not.checked');
      cy.get('#edit-attach-tnid').should('be.checked');
      cy.get('#label-edit-json-encode-fields-entity-id').should('be.checked');
      cy.get('#label-edit-json-encode-fields-publication-date').should('be.not.checked');
      cy.get('.form-item-json-encode-fields-contact').should('be.not.checked');
      cy.get('#edit-update-exclude-fields-user-id').should('be.not.checked');
      cy.get('#edit-update-exclude-fields-competitive-procurement-strategy').should('be.not.checked');
      cy.get('#edit-update-exclude-fields-competitive-procurement-strategy').should('be.not.checked');
      cy.screenshot();
      cy.visit('https://test.buyandsell.gc.ca/procurement-data/admin/config/system/variable');
      cy.get(':nth-child(1) > .fieldset-content > :nth-child(3)').contains(' ${solr.data.dir:./solr/data}');
      cy.get(':nth-child(1) > .fieldset-content > :nth-child(5)').contains('10000');
      cy.get(':nth-child(1) > .fieldset-content > :nth-child(9)').contains('False');
      cy.get(':nth-child(1) > .fieldset-content > :nth-child(11)').contains('60');
      cy.screenshot();
      cy.get('.vertical-tabs-list > :nth-child(9) > a').click();
      cy.get('[style="display: block;"] > .fieldset-content > :nth-child(4)').contains(
        ' Public Works and Government Services Canada',
      );
      cy.get('[style="display: block;"] > .fieldset-content > :nth-child(2)').contains('buyandsell.gc.ca');
      cy.screenshot();
    });
  },
);
