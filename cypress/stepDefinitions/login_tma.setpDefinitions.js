import { Given, Then, When, Before, And } from "cypress-cucumber-preprocessor/steps";
Given ('I login to TMA with {string} username {string} and password {string}', (logintype, username, password)=>{
    console.log(logintype)
    cy.origintmalogin(logintype, username, password);
    cy.visit('https://beta.buyandsell.gc.ca/tma', {
        auth: {
            username: 'pwp',
            password: 'eye-T$B33!',
  },
  })
})
//   Given ('I login to TMA with {string} username {string} and password {string}', (logintype, username, password)=>{
//     cy.origintmalogin(logintype, username, password);
//     cy.visit('https://beta.buyandsell.gc.ca/tma', {
//         auth: {
//             username: 'pwp',
//             password: 'eye-T$B33!',
//   },
//   })
// })