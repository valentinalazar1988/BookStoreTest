const { defineConfig } = require('cypress');
import './commands';
module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://carturesti.ro/', // the base URL
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // this is to specify the default spec pattern
    },
});
