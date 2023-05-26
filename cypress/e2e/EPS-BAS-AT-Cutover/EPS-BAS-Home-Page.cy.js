/*
Find the BAS Home page @ Cutover
*/

const { now } = require("lodash");

describe("BAS Home Page bookmarked at cutover",()=>{
  let testEnv = Cypress.env('base_url');

  it('1: Home Landing Page -EN', function() {
    cy.visit(testEnv+'buyandsell.gc.ca/')

    cy.get('h1#cont').should('contain', "buyandsell.gc.ca (Cutover)")

    }) //it

    it('2: Home Landing Page -FR ', function() {
      cy.visit(testEnv+'achatsetventes.gc.ca/')
  
      cy.get('h1#cont').should('contain', "achatsetventes.gc.ca (basculement)")
  
      }) //it
   })//describe