## Tests Included

### Conversion Rate Validation
- Verifies the correctness of conversion rates dynamically fetched from the page.
- Compares calculated amounts with displayed results, allowing for precision differences.

### Inverse Conversion Rate Validation
- Ensures the inverse rate displayed matches the reciprocal of the direct conversion rate.

### Currency Inversion
- Tests the functionality of the "Invert Currencies" button, ensuring source and target currencies are swapped correctly.

### URI Update
- Verifies that the page URI is updated with the correct query parameters after performing a conversion.

### Popular and Alphabetical Currencies
- Ensures popular currencies are listed at the top of dropdowns.
- Validates that other currencies are displayed in alphabetical order.

# Running the Tests

## Prerequisites

- Install Node.js (v16 or higher recommended).
- Install project dependencies with:

  ```bash
  npm install
  ```
## Running the Tests
- Open the Cypress Test Runner:
  ```bash
  npx cypress open
  ```
  Select the desired test file from the UI.
- Run the tests in headless mode:
  ```bash
  npx cypress run
  ```
## Test Structure
- Tests are located in the `cypress/e2e` directory, the file currencyConverter.cy.js