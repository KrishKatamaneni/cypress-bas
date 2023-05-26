
/*
Open canada data set should be available at cutover

*/
const { now } = require("lodash");

describe("download pData openCanada CSV newToday equivalent to beta for data analysis ", () => {

   let lineCount = 0;
   let testEnv = Cypress.env('base_url');

   it('1: download openCanada CSV services equivalent to beta and read file', () => {


      cy.downloadFile(testEnv + 'buyandsell.gc.ca/procurement-data/csv/tender/new-today',
         'cypress/downloads', 'tpsgc-pwgsc_ao-t_n.csv')

      cy.readFile('cypress/downloads/tpsgc-pwgsc_ao-t_n.csv')
         // cy.readFile('cypress/downloads/tpsgc-pwgsc_ao-t_a_s.csv')
         .then((data) => {
            //expect(data.body).to.not.be.null
            lineCount = data.split('\n').length - 1;
            //lineCount = Math.round(lineCount/2)
            console.log("csv linecount is:" + lineCount)
            // expect(data).should('contain','Not available')
            return lineCount
            // expect(data).to.have.property('fileName','tpsgc-pwgsc_ao-t_a_s.csv')
            //expect(data).should('include','PW-21-00960623')
         }).should('to.not.be.null')

      // timestamp
      const dt = new Date(now());
      console.log("AT done on: " + dt.toUTCString())
      // timestamp end
   })


})//describe



