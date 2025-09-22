import orangehrmData from 'C:\Users\Salma Casasola\Documents\TecnicalTestNI\cypress\e2e\INTest\orangehrm_data.json';

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/web/index.php/auth/login');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});
it('TC1: Ingresar credenciales incorrectas - Validar que no se pueda acceder al dashboard', () => {
        // Usamos el comando de login que creamos
        cy.login(orangehrmData.invalidCredentials.username, orangehrmData.invalidCredentials.password);

        // Validar que aparece el mensaje de error
        cy.get('.oxd-alert-content-text')
          .should('be.visible')
          .and('contain.text', 'Invalid credentials');

        // Validar que la URL sigue siendo la de login (no hemos sido redirigidos)
        cy.url().should('include', '/auth/login');
    });