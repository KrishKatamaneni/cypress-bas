
/*
Find incorrect characters() in dl csv
https://project.deen-gc.ca/issues/29776
Download pData, openCanada CSV Expired equivalent to beta and find incorrect character in the dataset

*/
const { now } = require("lodash");

describe("download pData openCanada CSV Expired equivalent to beta and data analysis ",()=>{
   
   let lineCount = 0 ;
   
   it('1: download openCanada CSV Expired equivalent to beta and read file(wait 5-7 min)',()=>{
 
    cy.downloadFile('https://beta.buyandsell.gc.ca/procurement-data/csv/tender/expired',
     'cypress/downloads', 'tpsgc-pwgsc_ao-t_e.csv')
     .then((data) => {
          }).should('to.not.be.null') 
          //expect(data).to.have.property('fileName','tpsgc-pwgsc_ao-t_e.csv')
      })

    it('2: Open downloaded csv for Expired and read file',()=>{

       cy.readFile('cypress/downloads/tpsgc-pwgsc_ao-t_e.csv', 'binary', { timeout: 150000 })
          .should(buffer => expect(buffer.length).to.be.gt(100))
          .then((data) => {
         
           let myData = csvJSON(data)
           console.log("data.body.length:" + myData.length)

            expect(myData.length).to.not.eq(0)

            return myData;
         
            }).should('to.not.include','""b')
              .and('to.not.include',"b'")
              
            //  .and('to.include','PW-$$CX-031-80496')
            //('to.not.be.null')

        //note: text
        Cypress.on('test:after:run', (attributes) => {
          console.log('Test "%s" has finished in %dms', attributes.title, attributes.duration)
         })  
          
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


   