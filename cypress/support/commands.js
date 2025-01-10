Cypress.Commands.add('loginViaCheckout', (email, password) => {
  // Navigate to the checkout page
  cy.visit('/checkout/signup'); // Replace with the full URL if necessary

  // Click the "Utilizator existent" button to trigger the login modal
  cy.get('#loginTrigger') // Button to open the login modal
    .should('be.visible') // Ensure it is visible
    .click();

  // Perform the login in the modal
  cy.get('#email-input') // Replace with the actual selector for the email input
    .type(email);
  cy.get('#password-input') // Replace with the actual selector for the password input
    .type(password);
  cy.get('button.login-btn') // Replace with the actual selector for the login button
    .click();

  // Verify the login was successful
  cy.url().should('not.include', '/checkout/signup');
});
