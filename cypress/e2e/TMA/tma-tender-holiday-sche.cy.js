/*
Login as EPS user and open an agreement detail page and try to edit to see those buttons. This 
is a partical automation of the ticket to verify the applied statutory holidays are in place 
Ref ticket https://project.deen-gc.ca/issues/29398
*/

const { now } = require("lodash");

describe(" TMA tenders, verify Scheduled Holidays", () => {

  let lineCount = 0;

  before(() => {
    cy.task(`getSession`, {
      username: `q-pa@eton.ca`,
      password: `test`,
      url: `https://beta.buyandsell.gc.ca/tma/`,
    }).then((session) => {
      cy.restoreSession(session);
    });
  });


  it('1: Login TMA and verify My Tenders page', function () {
    cy.visit('https://beta.buyandsell.gc.ca/tma/my-tenders')


    cy.get('#mainheading').should('contain', 'My Tenders').then(($elem) => {
      let yourString = $elem.text()
      let myVar2 = yourString.trim();
      console.log(yourString);

      // timestamp
      const dt = new Date(now());
      console.log("AT done on: " + dt.toUTCString())

    })

  })

  it('2: Verify holiday Scheduling', function () {
    cy.visit('https://beta.buyandsell.gc.ca/tma/publishing-schedule')



    cy.get('table').then(($tr) => {
      let $tds = $tr.find('td') // find all the tds
      console.log("Look for text in td: " + $tds.text())
      // console.log("TD count: " + $tds.length)
      return $tds

    }).should('contain', 'December 25').should('contain', 'Christmas Day')
      .should('contain', 'July 1').should('contain', 'Canada Day')
      .should('contain', 'Monday, September').should('contain', 'Labour Day')

  })



})//describe