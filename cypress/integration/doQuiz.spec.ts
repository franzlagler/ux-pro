const clickElement = (attr: string) => {
  cy.get(attr).should('be.visible').click();
  cy.wait(1000);
};

describe('DoQuiz', () => {
  it('should be able to do quiz', () => {
    cy.visit('http://localhost:3000/');
    clickElement('[data-cy="topic-item"]');
    clickElement('[data-cy="topic-0"]');
    clickElement('[data-cy="start-quiz-button"]');
    clickElement('[data-cy="answer-button-1"]');
    clickElement('[data-cy="next-button"]');
    clickElement('[data-cy="answer-button-1"]');
    clickElement('[data-cy="next-button"]');
    clickElement('[data-cy="answer-button-1"]');
    clickElement('[data-cy="finish-button"]');

    cy.get('[data-cy="results-heading"]').should('be.visible');
  });
});

export {};
