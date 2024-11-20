Cypress.Commands.add('acceptCookies', () => {
    cy.get('button.sc-fe840e0c-0.kpuPwJ', { timeout: 40000 })
        .should('be.visible')
        .click();
});