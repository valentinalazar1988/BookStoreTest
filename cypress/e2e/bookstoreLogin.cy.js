describe('Carturesti Online Bookstore - Login Flow', () => {
  it('should allow a user to log in', () => {
    // Visit the Carturesti homepage
    cy.visit('https://carturesti.ro/');

    // Click the menu or trigger to make the Login button visible
    cy.get('button[aria-label="Menu"]').click(); // Adjust the selector to target the menu trigger

    // Wait for the Login button to become visible
    cy.get('button[data-target="#modalLogin"]')
      .should('be.visible') // Ensure the Login button is visible
      .click(); // Click the Login button

    // Wait for the 'Utilizator existent' button to appear
    cy.get('#loginTrigger')
      .should('be.visible') // Ensure it is visible
      .click(); // Click the 'Utilizator existent' button

    // Fill in the email and password fields
    cy.get('#loginform-email') // Target the email input by its ID
      .should('be.visible') // Ensure it is visible
      .type('testuser@example.com'); // Enter the email

    cy.get('#loginform-password') // Target the password input by its ID
      .should('be.visible') // Ensure it is visible
      .type('securepassword'); // Enter the password

    // Click the 'Autentificare' button to log in
    cy.get('button[name="login-button"]') // Target the submit button by its name
      .should('be.visible') // Ensure it is visible
      .click(); // Click the button

    // Verify that the login was successful by checking for a specific element on the page
    cy.url().should('include', '/checkout'); // Ensure we are redirected to the checkout page
  });
});