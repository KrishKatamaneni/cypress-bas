
/*
missing contacts in dl csv
https://project.deen-gc.ca/issues/29779
partical automation to verify cotact field is not blank requested by the qa team
*/
const { now } = require("lodash");

describe(" pData csv download new today and find missing contact",()=>{
   
   let lineCount = 0 ;
   
   
  
    it('1: pData download csv tenders and read file',()=>{

      cy.downloadFile('https://beta.buyandsell.gc.ca/procurement-data/csv/tender/new-today',
        'cypress/downloads', 'tpsgc-pwgsc_ao-t_n.csv')

       
        
     //  cy.readFile('cypress/fixtures/tpsgc-pwgsc_ao-t_n.csv')
        cy.readFile('cypress/downloads/tpsgc-pwgsc_ao-t_n.csv')
         .then((data) => {
            //expect(data.body).to.not.be.null
            lineCount = data.split('\n').length-1;
           
            console.log("csv linecount is:" + lineCount)
           // let myData = Cypress.$(data.body).find('contact').toArray()
           let myData = csvJSON(data)
            console.log("data.body.length:" + myData.length)

            expect(myData.length).to.not.eq(0)

            console.log("csv my data:" + JSON.stringify(myData))
           
           // console.log("Total contact:" + myData.length)
            //expect(myData).should('contain','Not available')
            Cypress.on('test:after:run', (attributes) => {
            console.log('Test "%s" has finished in %dms', attributes.title, attributes.duration)
            })
            let i =0
           //let jsonData = csvJSON(data);
           //jsonData.forEach( elem => console.log(elem["contact"]));
           myData.forEach( elem => {
            
            if(elem['contact']==''){
              i++;
            }
           // else
            //console.log("my else data is:"+elem['contact']);
          })
          expect(i).to.eq(0);
          console.log("No of Contact fieleds found empty: "+ i)
           //expect(data).should('include','PW-21-00960623')
            })//.should('to.not.be.null')

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
