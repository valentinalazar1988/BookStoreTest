const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://www.xe.com/currencyconverter/', // the base URL for the currency convertr
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // this is to specify the default spec pattern
    },
});
