/*
Login as EPS user and open an agreement detail page and try to edit to see those buttons
Ref ticket https://project.deen-gc.ca/issues/29398
*/

const { now } = require("lodash");

describe(" SOSA EPS agreement, looking for Unpublish/Clone/Delete this agreement", () => {

  let lineCount = 0;

  before(() => {
    cy.task(`getSession`, {
      username: `q-eps-pa@eton.ca`,
      password: `passw0rd`,
      url: `https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application/my-agreements`,
    }).then((session) => {
      cy.restoreSession(session);
    });
  });


  it('1: Find buttons in the EPS Tender individually ', function () {
    cy.visit('https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application/CW3333-ACM137949646')

    cy.get('#edit-actionlocal-workbench-moderation-set-state-unpublish-action').should('contain', 'Unpublish')

    cy.get('#edit-actionlocal-workbench-moderation-clone-action').should('contain', 'Clone this agreement')

    cy.get('#edit-actionlocal-workbench-moderation-delete-action').should('contain', 'Delete this agreement').then(($elem) => {
      let yourString = $elem.text()

      let myVar2 = yourString.trim();


      // timestamp
      const dt = new Date(now());
      console.log("AT done on: " + dt.toUTCString())

    })

  })



})//describe