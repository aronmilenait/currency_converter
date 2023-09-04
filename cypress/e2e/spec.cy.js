describe('Page loading', () => {
  it('Page loads correctly', () => {
    cy.visit('/'); 
    cy.get('h1#page_title').should('contain', 'Currency Converter');
    cy.get('#main').should('exist');
    cy.get('#footer').should('exist');
  });
});

describe('Currency Conversion', () => {
it('Select a base and target currency', () => {
  cy.visit('/');
  cy.get('#baseCurrency').select('USD');
  cy.get('#targetCurrency').select('EUR');
  cy.get('#baseCurrency').should('have.value', 'USD');
  cy.get('#targetCurrency').should('have.value', 'EUR');
});
});

describe('Currency Conversion Successfully', () => {
it('Can convert a currency correctly', () => {
  cy.visit('/');
  cy.get('#baseCurrency').select('USD');
  cy.get('#targetCurrency').select('EUR');
  cy.get('#amount').type('100');
  cy.get('#calculateBtn').click();
  cy.get('#result').should('contain', '100 USD =');
});
});

describe('Error handling', () => {
it('Shows an error message', () => {
  cy.visit('/');
  cy.get('#amount').type('0'); 
  cy.get('#calculateBtn').click();
  cy.get('#result').should('contain', 'Please, enter a valid number.');
});
});

