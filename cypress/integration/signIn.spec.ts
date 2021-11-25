describe('SignIn', () => {
  it('should be able to log in with user data', () => {
    cy.visit('http://localhost:3000/auth/signin');
    cy.get('[data-cy="email-field"]')
      .should('be.visible')
      .type(Cypress.env('test_email'));
    cy.get('[data-cy="password-field"]')
      .should('be.visible')
      .type(Cypress.env('test_password'));
    cy.wait(2000);
    cy.get('[data-cy="signIn-button"]').should('be.visible').click();

    cy.get('[data-cy="previous-quizzes"]').should('be.visible');
  });
});
