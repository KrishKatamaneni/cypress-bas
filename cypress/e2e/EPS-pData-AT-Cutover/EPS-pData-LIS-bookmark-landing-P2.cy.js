/*
Find the Landing page of a previously bookmarked search page @ Cutover
*/

const { now } = require("lodash");

describe("Landing page of LIS content bookmarked ", () => {
  let testEnv = Cypress.env('base_url');

  it('1: Redirected LIS Landing Page ', function () {
    cy.visit(testEnv + 'buyandsell.gc.ca/procurement-data/tender-notice/PW-EL-641-38888/list-of-interested-suppliers')

    cy.url().should('include', '/gets-on-canadabuys-2')
    cy.get('h1').should('contain', "Canada's government electronic tendering service is now CanadaBuys")

  }) //it  
})//describe