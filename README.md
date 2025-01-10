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