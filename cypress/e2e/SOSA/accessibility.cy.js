/// <reference types="cypress" />

describe('SOSAA Accessibility Tests', () => {

  beforeEach(() => {
    cy.originsosaalogin();
    cy.visit('https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application/my-agreements', {
    auth: {
        username: 'pwp',
        password: 'eye-T$B33!',
    },
    });
    cy.injectAxe()
    cy.configureAxe({
        iframes: true,
        reporter: "v2",
      })
  })
    
  it("First Test", ()=> {
        
    cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a']
        }
      });
      })
})