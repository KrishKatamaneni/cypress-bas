import { Given, Then, When, Before, And } from "cypress-cucumber-preprocessor/steps";

let lineCount;

Given ('I am on the sosaa login page', ()=>{
    cy.originsosaalogin();
    cy.visit('https://beta.buyandsell.gc.ca/standing-offers-and-supply-arrangements-application', {
        auth: {
            username: 'pwp',
            password: 'eye-T$B33!',
  },
  })
});
When ('I enter the value {string} in the title field', title=>{
    cy.get('#edit-title-field-value').click().type(title)
});
Then ('I select {string} from the type field', type=>{
    cy.get('#edit-combine-select-type').select(type)
});
And ('I select {string} from CCPI', ccpi=>{
    cy.get('#edit-combine-select-auth-grp').select(ccpi)
});
And ('I select {string} from state', state=>{
    cy.get('#edit-state').select(state)
});
Then ('I click Apply', btn=>{
    cy.get('#edit-submit-wetkit-og-all-user-group-content').click()
    cy.wait(5000)
});
When ('I navigate to the {string} and download {string}', (url,filename)=>{
     cy.downloadFile(url,'cypress/downloads', filename)
});
When ('I click download menu option',()=> {
    cy.get('.menu-mlid-2718').click()
    cy.wait(3000)
});
Then ('I read the downloaded file',()=> {
    cy.readFile('cypress/downloads/aocama_accords-sosaa_agreements.csv')
      .then((data) => {

        var lineCounts = data.split('\n').length - 1;
        lineCount = Math.round(lineCounts / 2)

        return lineCount
    

      }).should('to.not.be.null')
});
Then ('I verify records with the saved data',()=>{
    cy.log(" Here is the total num of csv download records div by 2: " + lineCount);
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
    const dt = new Date();
    cy.log("AT done on: " + dt.toUTCString())
    // timestamp end
    });