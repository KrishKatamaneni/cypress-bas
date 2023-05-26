describe(`Certificate verification for SRI`, () => {
  it(`English Verification`, () => {
    cy.visit(`https://srisupplier.contractscanada.gc.ca/`);
    cy.verifyCertifacteEndDate('08/25/2022', 'srisupplier.contractscanada.gc.ca');
  });
});
