
/*
 RSS feed at Cutover
*/
const { now } = require("lodash");
describe(" pData RSS feed comparison with app", () => {

  //let lineCount = 0 ;
  let testEnv = Cypress.env('base_url');


  it('1: Verify RSS feed items', function () {
    cy.request('GET', testEnv + 'buyandsell.gc.ca/procurement-data/feed?ss_publishing_status=SDS-SS-005&sm_facet_procurement_data=%28tender_notice%20AND%20data_data_tender_notice%29&ss_language=en&rss_atom_title=%7B%22sm_facet_procurement_data%22%3A%5B%22data_data_tender_notice%22%5D%2C%22ss_publishing_status%22%3A%5B%22SDS-SS-005%22%5D%7D').then(
      (response) => {

        let myData = Cypress.$(response.body)
          .find('item').toArray()

        //  expect(myData.length).to.gt(0)  //NOT AT CUTOVER 
        expect(myData.length).to.eq(0)  //AT CUTOVER

        // timestamp
        const dt = new Date(now());
        console.log("AT done on: " + dt.toUTCString())
        // timestamp end
      })
  })

})//describe