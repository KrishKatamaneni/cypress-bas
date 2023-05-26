/*
Downloaded SOSA agreements CSV files comparison with application
Ref ticket https://project.deen-gc.ca/issues/29449
*/

const { now } = require("lodash");

describe(" SOSA csv download, read and compare records with the app", () => {

  let lineCount = 0;

  before(() => {
    cy.task(`getSession`, {
      username: `q-admin@eton.ca`,
      password: `test`,
      url: `https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application/my-agreements`,
    }).then((session) => {
      cy.restoreSession(session);
    });
  });


  it('1: download csv and read file', () => {

    cy.downloadFile('https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application/nightly-report',
      'cypress/downloads', 'aocama_accords-sosaa_agreements.csv')


    cy.readFile('cypress/downloads/aocama_accords-sosaa_agreements.csv')
      .then((data) => {

        lineCount = data.split('\n').length - 1;
        lineCount = Math.round(lineCount / 2)

        return lineCount


      }).should('to.not.be.null')
  })



  it('2: verify the records with the sosa app displayed number, re-run the script if fails 1st time', function () {
    cy.visit('https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application/my-workspace')


    console.log(" Here is the total num of csv download records div by 2: " + lineCount);
    cy.get('caption').then(($elem) => {
      let yourString = $elem.text()

      let myVar = yourString.match(/of \d*/)[0].split(" ")[1]

      console.log(" Here is the value from app: " + myVar);
      let intAppVar = Math.abs(parseInt(myVar));
      let missingRecords = (intAppVar - lineCount);
      console.log("Record differences: " + missingRecords)

      let errPercentage = 0;
      errPercentage = ((lineCount / intAppVar) * 100);

      console.log("Downloaded csv record correction percentage = " + errPercentage)
      return errPercentage//.valueOf()

    }).should('be.gte', 94)

    // timestamp
    const dt = new Date(now());
    console.log("AT done on: " + dt.toUTCString())
    // timestamp end

  })

})//describe