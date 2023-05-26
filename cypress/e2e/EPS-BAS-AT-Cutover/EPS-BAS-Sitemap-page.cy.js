/*
visit pData sitemap page @ Cutover
*/

const { now } = require("lodash");

describe("Sitemap Page bookmarked at Cutover",()=>{
  let testEnv = Cypress.env('base_url');
  
  it('1: Sitemap page ', function() {
    cy.visit(testEnv+'buyandsell.gc.ca/sitemap')

   cy.get('h1#cont').should('contain', "Site map") // use it at  BAS Cutover
   // cy.get('h1').should('contain', "Site map")//change at cutover
   
        // timestamp
      const dt = new Date(now());
      console.log("AT done on: " + dt.toUTCString())
   

  }) //it 
})//describe