/*
EPS at Cutover no ATOM feed for published today feed
Ref: 
*/

const { now } = require("lodash");

describe(" Observe EPS cutover behaviour for - pData ATOM feed",()=>{
   
    let testEnv = Cypress.env('base_url');
    

  it('1: Verify ATOM feed items', function() {
        cy.request('GET', testEnv+'buyandsell.gc.ca/procurement-data/feed/atom?dds_facet_date_published=NOW/DAY%20TO%20NOW/DAY%2B86399999MILLISECONDS&sm_facet_procurement_data=%28tender_notice%20AND%20data_data_tender_notice%29&ss_language=en&rss_atom_title=%7B%22sm_facet_procurement_data%22%3A%5B%22data_data_tender_notice%22%5D%2C%22dds_facet_date_published%22%3A%5B%22dds_facet_date_published_today%22%5D%7D').then(
        (response) => {
              
          let myData = Cypress.$(response.body)
        .find('entry').toArray()
          //.map(el => el.innerText)
          console.log("Total ATOM feed items are: " + myData.length)
        // expect(myData.length).to.gt(0)  //NOT AT CUTOVER 
         expect(myData.length).to.eq(0)  //AT CUTOVER
          
        }) 
      // timestamp
      const dt = new Date(now());
      console.log("AT done on: " + dt.toUTCString())
      // console.log("Execution Date and time is: " + dt.toLocaleString())
  })

  
  
 })//describe
