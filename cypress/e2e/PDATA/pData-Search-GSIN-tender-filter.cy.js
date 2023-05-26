/*
This script will search the tender containing word 'T000D' and will align with the appropriate GSIN filter
issue: https://project.deen-gc.ca/issues/27584
Note: 
If this filter doesn't work at a certain time, update it with a valid search filter page in pData
*/

const { now } = require("lodash");

describe(" pData Search filter GSIN test with word search", () => {

   let lineCount = 0;


   it('1: Find Tenders with the key workd T000D, and filter it by the GSIN', function () {
      cy.visit('https://beta.buyandsell.gc.ca/procurement-data/search/site/%27T000D%27?retain-filters=1&f%5B0%5D=sm_facet_procurement_data%3Atender_notice&f%5B1%5D=ss_publishing_status%3ASDS-SS-009&f%5B2%5D=sm_facet_gsin%3AS')

      cy.get('span.panel-title').then(($elem) => {
         let yourString = $elem.text()
         let myVar = yourString.split('for')[1]
         let myVar2 = myVar.trim();

         console.log("Search for the word: " + myVar2);
         expect(myVar2).to.contain('T000D')
         expect(myVar2).to.have.length(8)

         // timestamp
         const dt = new Date(now());
         console.log("AT done on: " + dt.toUTCString())

      })

   })




})//describe
