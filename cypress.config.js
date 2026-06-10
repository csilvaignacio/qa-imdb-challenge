const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    testFiles: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'https://pokeapi.co',
    env: {
      apiUrl: 'https://pokeapi.co/api/v2',
    },
    setupNodeEvents(on, config) {
      return config
    },
    reporter: 'spec',
    retries: {
      runMode: 1,
      openMode: 0,
    },
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
})