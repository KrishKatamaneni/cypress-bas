
/*
missing contacts in dl csv
https://project.deen-gc.ca/issues/29776
Download pData, openCanada CSV services equivalent to beta and find incorrect character in the dataset
Note: this script works only for smaller dataset

*/
const { now } = require("lodash");

describe("download pData openCanada CSV newToday equivalent to beta and data analysis ",()=>{
   
   let lineCount = 0 ;
   
   it('1: download openCanada CSV services equivalent to beta and read file',()=>{
  
  
    cy.downloadFile('https://beta.buyandsell.gc.ca/procurement-data/csv/tender/new-today',
     'cypress/downloads', 'tpsgc-pwgsc_ao-t_n.csv')
      
      cy.readFile('cypress/downloads/tpsgc-pwgsc_ao-t_n.csv')
     // cy.readFile('cypress/downloads/tpsgc-pwgsc_ao-t_a_s.csv')
       .then((data) => {
          //expect(data.body).to.not.be.null
          lineCount = data.split('\n').length-1;
          //lineCount = Math.round(lineCount/2)
          console.log("csv linecount is:" + lineCount)
         // expect(data).should('contain','Not available')
         return lineCount   
        // expect(data).to.have.property('fileName','tpsgc-pwgsc_ao-t_a_s.csv')
         //expect(data).should('include','PW-21-00960623')
          }).should('to.not.be.null') 
      })

    it('2: Open downloaded csv for newToday and read file',()=>{

    //  cy.downloadFile('https://beta.buyandsell.gc.ca/procurement-data/csv/tender/new-today',
      //  'cypress/downloads', 'tpsgc-pwgsc_ao-t_a_s.csv')
        
       //cy.readFile('cypress/downloads/tpsgc-pwgsc_ao-t_n.csv')
       cy.readFile('cypress/downloads/tpsgc-pwgsc_ao-t_n.csv')
         .then((data) => {
            //expect(data.body).to.not.be.null
            lineCount = data.split('\n').length-1;
           
            console.log("csv linecount when read:" + lineCount)
           
            let myData = csvJSON(data)
            console.log("data.body.length:" + myData.length)

            expect(myData.length).to.not.eq(0)

            let myString = JSON.stringify(myData);

            console.log("csv my data:" + JSON.stringify(myData))
          
         //   expect(myData).should('contain','Not available')
            Cypress.on('test:after:run', (attributes) => {
            console.log('Test "%s" has finished in %dms', attributes.title, attributes.duration)
            })
         
          //expect(myString).should('include','ABC')
            }).should('to.not.include','""b')
              .and('to.not.include',"b'")
            //  .and('to.include','PW-$$CX-031-80496')
            //('to.not.be.null')

          // timestamp
        const dt = new Date(now());
        console.log("AT done on: " + dt.toUTCString())
        // timestamp end
        })
        
   })//describe

   // outside function
   //var csv is the CSV file with headers
   function csvJSON(csv) {
    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].split(',')

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    return result
}


   