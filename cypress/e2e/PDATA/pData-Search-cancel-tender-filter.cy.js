/*
This script will get the cancel search to include the in the filtere for user 'Kathie Taylor'
issue: https://project.deen-gc.ca/issues/29664
Note: 
If this filter doesn't work at a certain time, update it with a valid search filter page in pData
*/

const { now } = require("lodash");

describe(" pData Search filter cancel test with user search", () => {

   let lineCount = 0;


   it('1: Find Cancelled notices by Kathie Taylor', function () {
      cy.visit('https://beta.buyandsell.gc.ca/procurement-data/search/site/Kathie%2520Taylor?retain-filters=1&f%5B0%5D=ss_publishing_status%3ASDS-SS-008')

      cy.get('span.panel-title').then(($elem) => {
         let yourString = $elem.text()
         let myVar = yourString.split('for')[1]
         let myVar2 = myVar.trim();

         expect(myVar2).to.contain('Kathie Taylor.')

         // timestamp
         const dt = new Date(now());
         console.log("AT done on: " + dt.toUTCString())

      })

   })




})//describe
