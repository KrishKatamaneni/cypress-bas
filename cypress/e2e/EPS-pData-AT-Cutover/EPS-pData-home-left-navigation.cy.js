/*
Find the side nav of the pData home page @ Cutover
*/

const { now } = require("lodash");

describe("Landing page of bookmarked search ", () => {
  let testEnv = Cypress.env('base_url');

  it('1: Side nav of pData home page ', function () {
    cy.visit(testEnv + 'buyandsell.gc.ca/procurement-data/')

    cy.get('h1#cont').should('contain', " Procurement Data (Cutover)")

    cy.get('.menu').then(($ul) => {
      let $li = $ul.find('li')
      console.log("Li count: " + $li.length)
      return $li

    })
    /*
     .should('contain','Contract History')//cutover no impact
     .should('contain','United Nations Standard Products and Services Code (UNSPSC)')
     .should('contain','Goods and Services Identification Number (GSIN)')
     .should('contain','Open Contracting Data Standard Pilot')
     .should('contain','About Procurement Data')
   //  .should('not.contain','Tenders') // at cutover fail at 
     .should('contain','Standing Offers and Supply Arrangements (SOSA)')
   */
    // timestamp
    const dt = new Date(now());
    console.log("AT done on: " + dt.toUTCString())

  }) //it



})//describe