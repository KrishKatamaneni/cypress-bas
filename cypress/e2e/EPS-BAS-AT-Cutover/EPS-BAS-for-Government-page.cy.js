/*
visit pData for-Government page @ Cutover
*/

const { now } = require("lodash");

describe("Landing page of bookmarked Government Page ", () => {
  let testEnv = Cypress.env('base_url');

  it('1: for Government Page(En) ', function () {
    cy.visit(testEnv + 'buyandsell.gc.ca/for-government')

    cy.get('h1#cont').should('contain', "For Government (Cutover)") // at Cutover
    //cy.get('h1').should('contain', "For Government")// Normal without cutover

  }) //it

  it('2: for Government Page (Fr) ', function () {
    cy.visit(testEnv + 'achatsetventes.gc.ca/pour-le-gouvernement')

    cy.get('h1#cont').should('contain', "Pour le gouvernement (basculement)") // at Cutover
    //cy.get('h1').should('contain', "For Government")// Normal without cutover

    // timestamp
    const dt = new Date(now());
    console.log("AT done on: " + dt.toUTCString())

  }) //it
})//describe