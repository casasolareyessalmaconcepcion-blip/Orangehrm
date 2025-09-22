const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com', // La parte base de la URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/**/*.spec.js', // Patrón para encontrar los archivos de pruebas
  },
  // Otras configuraciones, si son necesarias
  // projectId: "your-project-id" // Si usas Cypress Cloud
});
