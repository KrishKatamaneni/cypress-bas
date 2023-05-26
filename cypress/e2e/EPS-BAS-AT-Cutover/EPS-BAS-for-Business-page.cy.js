/*
visit pData for-Business page @ Cutover
*/

const { now } = require("lodash");

describe("Business Page bookmarked at Cutover", () => {
  let testEnv = Cypress.env('base_url');

  it('1: Business page - EN ', function () {
    cy.visit(testEnv + 'buyandsell.gc.ca/for-businesses')

    cy.get('h1#cont').should('contain', "For Businesses (Cutover)") // use it at  BAS Cutover
    //cy.get('h1').should('contain', "For Businesses")//change at cutover

  }) //it

  it('2: Business page - FR', function () {
    cy.visit(testEnv + 'achatsetventes.gc.ca/pour-les-entreprises')

    cy.get('h1#cont').should('contain', "Pour les entreprises (basculement)") // use it at  BAS Cutover
    //cy.get('h1').should('contain', "For Businesses")//change at cutover

    // timestamp
    const dt = new Date(now());
    console.log("AT done on: " + dt.toUTCString())

  }) //it
})//describe