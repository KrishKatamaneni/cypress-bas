/// <reference types="cypress" />

const { now } = require("lodash");

context('Actions', () => {

   beforeEach(() => {
  
  
  });

  it('SOSAA Login', () => {
   cy.originsosaalogin();
   cy.visit('https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application', {
      auth: {
          username: 'pwp',
          password: 'eye-T$B33!',
},
})
  });
  });