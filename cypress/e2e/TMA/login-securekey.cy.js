/// <reference types="cypress" />

const { now } = require("lodash");

context('Actions', () => {

   beforeEach(() => {
  
  
  });

  it('TMA Login', () => {
   cy.origintmalogin();
   cy.visit('https://beta.buyandsell.gc.ca/tma', {
      auth: {
          username: 'pwp',
          password: 'eye-T$B33!',
},
})
  });
  });