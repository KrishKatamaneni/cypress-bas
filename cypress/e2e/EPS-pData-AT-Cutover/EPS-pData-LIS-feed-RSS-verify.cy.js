/*
EPS at Cutover no RSS feed for published today feed
Ref: 
*/

const { now } = require("lodash");

describe(" Observe EPS cutover behaviour for - pData RSS feed", () => {

  // let lineCount = 0 ;
  let testEnv = Cypress.env('base_url');




  it('1: Verify RSS feed items', function () {
    cy.request('GET', testEnv + 'buyandsell.gc.ca/procurement-data/feed/lis/rss/PW-%2524%2524EL-641-38888').then(
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
    
  })
})//describe
