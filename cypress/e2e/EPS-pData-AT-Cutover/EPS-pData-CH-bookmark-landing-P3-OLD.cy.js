/*
Find the Landing page of a previously bookmarked CH page @ Cutover
ref: https://gitlab.buyandsell.gc.ca/buy-and-sell/PDATA/-/issues/265
*/

const { now } = require("lodash");

describe("Landing page of CH content bookmarked ", () => {
  let testEnv = Cypress.env('base_url');

  it('1: Redirected CH Landing Page ', function () {
    cy.visit(testEnv + 'buyandsell.gc.ca/procurement-data/contract-history/get-started-with-contract-history')

    cy.get('h1#cont').should('contain', "Get Started with Contract History")


  }) //it

})//describe