import { Given, Then, When, Before, And } from "cypress-cucumber-preprocessor/steps";
Given ('I am on the login page', ()=>{
    cy.origintmalogin();
    cy.visit('https://beta.buyandsell.gc.ca/tma', {
        auth: {
            username: 'pwp',
            password: 'eye-T$B33!',
  },
  })
  cy.get()
})