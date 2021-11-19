describe('home page', () => {
  it('should display hi world text', () => {
    cy.visit('http://localhost:3000');

    cy.get('h1').contains('Hi world');
  });
});
