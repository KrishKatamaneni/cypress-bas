/*
Find the Landing page of a previously bookmarked search page @ Cutover
*/

const { now } = require("lodash");

describe("Landing page of bookmarked search ", () => {
  let testEnv = Cypress.env('base_url');

  it('1: Redirected Landing Page ', function () {
    cy.visit(testEnv + 'buyandsell.gc.ca/procurement-data/search/site?f%5B0%5D=sm_facet_procurement_data%3Adata_data_tender_notice&f%5B1%5D=dds_facet_date_published%3Adds_facet_date_published_today')

    cy.url().should('include', '/gets-on-canadabuys-1')
    cy.get('h1').should('contain', "Canada's government electronic tendering service is now CanadaBuys")

  }) //it





})//describe