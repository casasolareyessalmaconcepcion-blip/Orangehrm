// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// cypress/support/e2e.js (o index.js)
// Import commands.js using ES2015 syntax:
// cypress/support/e2e.js
import './commands';

// Ignorar errores no controlados de la aplicación
Cypress.on('uncaught:exception', (err, runnable) => {
  console.warn('Cypress caught an uncaught exception from the application:', err.message);
  return false; // Retorna false para evitar que Cypress falle el test
});
