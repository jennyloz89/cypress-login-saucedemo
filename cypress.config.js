const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotOnRunFailure: true,
    video: false,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 120000,
    responseTimeout: 30000,
    chromeWebSecurity: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Eventos de Node aquí
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});

