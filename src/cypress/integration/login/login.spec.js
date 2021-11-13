describe('Nav menus', () => {
  context('720 res', () => {
    beforeEach(() => {
      cy.viewport(1200, 720);
    });

    describe('when visiting home page', () => {
      it('should navigate to the homepage', () => {
        cy.visit('/');
      });

      describe('login form', () => {
        it('should fillup the form', () => {
          const emailField = cy.get('[data-cy=email-field]');
          emailField.type('testemail@test.com');
          emailField.should('have.value', 'testemail@test.com');
        });
      });
    });
  });
});
