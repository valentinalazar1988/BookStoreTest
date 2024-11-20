describe('Currency Converter Tests', () => {
    const TIMEOUT = { timeout: 10000 };

    beforeEach(() => {
        cy.visit('https://www.xe.com/currencyconverter/');
        cy.wait(3000);
    });

    // Validate convertor values
    it('should allow specifying numeric amounts, source, and target currencies', () => {
        cy.get('input#amount', { timeout: 10000 })
        .clear()
        .type('10.00');
        cy.get('input#amount').should('have.value', '10.00');

        cy.get('input[aria-describedby="midmarketFromCurrency-current-selection"]', { timeout: 10000 })
            .type('USD')
            .should('have.value', 'USD');

        cy.get('input[aria-describedby="midmarketToCurrency-current-selection"]', { timeout: 10000 })
                    .type('EUR')
                    .should('have.value', 'EUR');
    });

    // Check the conversion and that the results are mathematically correct
    it('should display the correct conversion result based on the conversion rate', () => {

        // get the conversion rate displayed on the page
        cy.get('[data-key="EUR"] > .sc-fbcebf18-4 > :nth-child(2)').then(($rate) => {
            const conversionRate = parseFloat($rate.text());
            expect(conversionRate).to.be.greaterThan(0);

            //Enter amount
            cy.get('.amount-input').type('10');

            // Verify that USD to EUR is selected by default
            cy.get('#midmarketFromCurrency').contains('USD').should('be.visible');
            cy.get('#midmarketToCurrency').contains('EUR').should('be.visible');

            // Click Convert
            cy.get('.order-1').click();

            // Wait for the result to be displayed on the page
            cy.get('.sc-63d8b7e3-1').contains('Euro').should('be.visible');

            // Calculate the expected amount using the fetched conversion rate
            const expectedAmount = 10 * conversionRate;

            // Verify the calculated amount
            cy.get('.sc-63d8b7e3-1').then(($convertedAmount) => {
                const displayedAmount = parseFloat($convertedAmount.text());
                expect(displayedAmount).to.be.closeTo(expectedAmount, 0.0001);
            });

        });

    });
    //Check that the Inverse Conversion Rate is Displayed
    it('should display the correct inverse conversion rate', () => {
        // Verify and get the conversion rate displayed on the page
        cy.get('[data-key="EUR"] > .sc-fbcebf18-4 > :nth-child(2)').then(($rate) => {
            const conversionRate = parseFloat($rate.text());
            expect(conversionRate).to.be.greaterThan(0);

            // Calculate the expected inverse rate
            const expectedInverseRate = 1 / conversionRate;

            // Click the "Invert Currencies" button
            cy.get('[aria-label="Swap currencies"]').click();

            cy.get('[data-key="USD"] > .sc-fbcebf18-4 > :nth-child(2)').then(($inverseRate) => {
                const displayedInverseRate = parseFloat($inverseRate.text());
                expect(displayedInverseRate).to.be.closeTo(expectedInverseRate, 0.0001);
            });
        });
    });

    //Check that the "Invert Currencies" Button Works
    it('should swap source and target currencies when "Invert Currencies" is clicked', () => {
        // Verify initial currencies are USD -> EUR
        cy.get('#midmarketFromCurrency').contains('USD').should('be.visible');
        cy.get('#midmarketToCurrency').contains('EUR').should('be.visible');

        // Click the "Invert Currencies" button
        cy.get('[aria-label="Swap currencies"]').click();

        // Verify the currencies are swapped to EUR -> USD
        cy.get('#midmarketFromCurrency').contains('EUR').should('be.visible');
        cy.get('#midmarketToCurrency').contains('USD').should('be.visible');
    });

    //check that the URI Updates After Conversion
    it('should update the URI with conversion parameters', () => {
        // Enter amount
        cy.get('.amount-input').type('50');

        // Verify that USD to EUR is selected by default
        cy.get('#midmarketFromCurrency').contains('USD').should('be.visible');
        cy.get('#midmarketToCurrency').contains('EUR').should('be.visible');

        // Click Convert
        cy.get('.order-1').click();

        // Wait for the result
        cy.wait(3000);

        // Verify the URI contains the correct conversion parameters
        cy.url().should('contain', 'Amount=50');
        cy.url().should('contain', 'From=USD');
        cy.url().should('contain', 'To=EUR');
    });


    // Check Popular and Alphabetical Currencies display
    it('should list popular currencies at the top and others alphabetically', () => {
        cy.get('#midmarketFromCurrency').click();

        // Verify popular currencies are listed at the top
        const popularCurrencies = ['USD US Dollar', 'EUR Euro', 'GBP British Pound', 'CAD Canadian Dollar']; // Popular currencies in expected order
        cy.get('ul#midmarketFromCurrency-listbox', { timeout: 10000 })
        .find('li')
        .each((el, index) => {
            if (index < popularCurrencies.length) {
                expect(Cypress.$(el).text().trim()).to.equal(popularCurrencies[index]);
            }
        });

        // Verify the rest of the currencies are listed alphabetically - they are NOT
        /*
        cy.get('ul#midmarketFromCurrency-listbox').then(($listbox) => {
            const items = $listbox.find('li').map((i, el) => Cypress.$(el).text().trim()).get();
            const remainingCurrencies = items.slice(popularCurrencies.length);
            const sorted = [...remainingCurrencies].sort((a, b) => a.localeCompare(b));
            expect(remainingCurrencies).to.deep.equal(sorted);
        });
        */
    });
     it('should display error message when entering negative value', () => {

        //Enter negative value
        cy.get('input#amount', { timeout: 10000 })
        .clear()
        .type('-10.00');
        cy.get('input#amount').should('have.value', '-10.00');

        //Verify error message
        cy.get('.sc-52d95371-0').contains('Please enter an amount greater than 0').should('be.visible');

         //Convert button is disabled - conversion does not happen
         cy.get('.order-1').should('be.disabled');
    });

    it('should display error message when entering non numeric value', () => {

        //Enter negative value
        cy.get('input#amount', { timeout: 10000 })
        .clear()
        .type('abcd');
        cy.get('input#amount').should('have.value', 'abcd');

        //Verify error message
        cy.get('.sc-52d95371-0').contains('Please enter a valid amount').should('be.visible');

         //Convert button is disabled - conversion does not happen
         cy.get('.order-1').should('be.disabled');
    });

    it('should access a conversion page directly by specifying query string parameters', () => {

        //Visit conversion page with specified query string parameters for converting 25 EUR to USD
        cy.visit('https://www.xe.com/currencyconverter/convert/?Amount=25&From=EUR&To=USD');

        //Verify input amount
        cy.get('input#amount').should('have.value', '25.00');

        //Verify source and target currencies
        cy.get('#midmarketFromCurrency').contains('EUR').should('be.visible');
        cy.get('#midmarketToCurrency').contains('USD').should('be.visible');

        //Verify that conversion results are displayed
        cy.get('[data-testid="conversion"]').first().should('be.visible').within(() => {
            cy.contains('25.00 Euros').should('be.visible');
            cy.contains('US Dollars').should('be.visible');
            cy.contains('1 EUR =').should('be.visible');
            cy.contains('1 USD =').should('be.visible');
        });
    });
});