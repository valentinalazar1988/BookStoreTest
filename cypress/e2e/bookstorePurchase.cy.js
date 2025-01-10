describe('Carturesti Online Bookstore - Purchase Flow', () => {
  let testData;

  before(() => {
    // Load static data from the JSON file
    cy.fixture('bookstoreData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // Navigate to the Carturesti homepage
    cy.visit('https://carturesti.ro/');
  });

  it('should allow a user to search and purchase a book', () => {
    // Search for a book
    cy.get('#search-input').type(`${testData.bookTitle}`);

    // Wait for the search results dropdown and click the desired book
    cy.get('#search-result-dropdown')
      .should('be.visible') // Ensure dropdown is visible
      .contains(testData.bookTitle) // Look for the specific book
      .type('{enter}'); // Simulate pressing Enter

    cy.get('button.adauga-in-cos')
      .should('exist') // Verify that the button exists
      .click(); // Click the button

    // View the shopping cart
    cy.get('a.checkout__button')
      .should('exist') // Verify that the button exists
      .click(); // Click the button

     cy.get('a.butonFinalizare')
       .first() // Select the first matching element
       .should('exist') // Ensure it exists
       .click();

    /*
    cy.get('tbody td')
      .first() // Select the first row
      .within(() => {
        // Assert the product title is correct
        cy.get('td.coloanaProdus') // Parent container
     //     .should('exist') // Ensure the parent exists
          .find('.checkout-cart-title') // Locate the title within the parent
          .should('be.visible') // Ensure the title is visible
          .should('contain.text', 'Micul print'); // Assert the correct text

        // Assert the quantity is 1
        cy.get('input[type="number"]')
          .should('have.value', '1');
      });
      */
      cy.get('a.next-btn') // Select the button by its class
        .should('be.visible') // Ensure it is visible
        .should('have.attr', 'href', '/checkout/delivery') // Validate the href attribute
        .click(); // Click the button

      /*
        // Assert check-out data filled in
       // Fill in billing and shipping details (Example values used here)
          cy.get('#billing_first_name').type(testData.billingDetails.firstName);
          cy.get('#billing_last_name').type(testData.billingDetails.lastName);
          cy.get('#billing_address_1').type(testData.billingDetails.address);
          cy.get('#billing_city').type(testData.billingDetails.city);
          cy.get('#billing_postcode').type(testData.billingDetails.postcode);
          cy.get('#billing_phone').type(testData.billingDetails.phone);
          cy.get('#billing_email').type(testData.billingDetails.email);

          // Select payment method and place the order
          cy.get('#payment_method_cod').check(); // Cash on delivery (example)
          cy.get('#place_order').click();

          // Verify the order confirmation page
          cy.contains('Comanda ta a fost plasată cu succes').should('be.visible');

          */
  });
});
