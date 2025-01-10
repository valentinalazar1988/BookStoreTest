describe('Carturesti Online Bookstore - Login Flow', () => {
  let loginData;

  before(() => {
    // Load login data from a JSON file
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  it('should allow a user to log in via the checkout form', () => {
    // Visit the checkout signup page directly
    cy.visit('https://carturesti.ro/checkout/signup'); // Replace with the full URL if necessary

    // Fill in the email field
    cy.get('#checkoutloginform-email') // Select the email input by its ID
      .should('be.visible') // Ensure the email field is visible
      .type(loginData.email); // Type in the email

    // Fill in the password field
    cy.get('#checkoutloginform-password') // Select the password input by its ID
      .should('be.visible') // Ensure the password field is visible
      .type(loginData.password); // Type in the password

    // Click the login button
    cy.get('button[type="submit"]') // Select the submit button
      .should('be.visible') // Ensure the login button is visible
      .click(); // Click the login button

    // Verify successful login
    cy.url().should('not.include', '/checkout/signup'); // Ensure redirection happened
  });
});
