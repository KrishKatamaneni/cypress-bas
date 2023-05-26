
/*
This script will get the RSS feed from the pData all Active tenders and will compare 
with the displayed etries to match the number. 
Note: Maximum 250 feed entries will will be displayed in the page 
*/
const { now } = require("lodash");
describe(" pData RSS feed comparison with app",()=>{
   
    let lineCount = 0 ;
        
  it('1: Find number of all active tenders', function() {
       cy.visit('https://beta.buyandsell.gc.ca/procurement-data/search/site?f%5B0%5D=sm_facet_procurement_data%3Adata_data_tender_notice&f%5B1%5D=ss_publishing_status%3ASDS-SS-005')
       //var appRecord = cy.get('caption')
      
       cy.get('span.panel-title').then( ($elem) => { let yourString=$elem.text() 
         
           let myVar = yourString.match(/of \d*/)[0].split(" ")[1]
            console.log(" Here is the number of active tenders from the app: "+myVar);
            //lineCount =  Math.abs(parseInt(myVar,16))
            lineCount =  Math.abs(parseInt(myVar))
            return lineCount
            }).should('be.gt',0)
 
    }) 
    
  it('2: Verify RSS feed items', function() {
        cy.request('GET','https://beta.buyandsell.gc.ca/procurement-data/feed?ss_publishing_status=SDS-SS-005&sm_facet_procurement_data=%28tender_notice%20AND%20data_data_tender_notice%29&ss_language=en&rss_atom_title=%7B%22sm_facet_procurement_data%22%3A%5B%22data_data_tender_notice%22%5D%2C%22ss_publishing_status%22%3A%5B%22SDS-SS-005%22%5D%7D').then(
        (response) => {
          
          let myData = Cypress.$(response.body)
            .find('item').toArray()
          //.map(el => el.innerText)
          console.log("Total RSS feed items are: " + myData.length)
          if(lineCount >= 250){
                expect(myData.length).to.eq(250)
            }else{
                expect(myData.length).to.eq(lineCount)}
                
               })
      // timestamp
      const dt = new Date(now());
      console.log("AT done on: " + dt.toUTCString())
      // timestamp end
      })
      
 })//describe