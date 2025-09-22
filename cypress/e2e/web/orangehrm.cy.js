/// <reference types="cypress" />

import orangehrmData from '../../fixtures/orangehrm_data.json';
describe('OrangeHRM Web Platform Tests', () => {
    // ---TC1:Login failed---
    it('TC1:Ingresar credenciales incorrectas - Validar que NO pueda acceder al dashboard', () => {
        cy.login(orangehrmData.invalidCredentials.username, orangehrmData.invalidCredentials.password);

        cy.get('.oxd-alert-content-text')
          .should('be.visible')
          .and('contain.text', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // ---TC2: Login ---
    it('TC2: Hacer login: Validar que el usuario pueda acceder al dashboard', () => {
        cy.login(orangehrmData.validCredentials.username, orangehrmData.validCredentials.password);

        // Validate that the URL includes '/dashboard'
        cy.url().should('include', '/dashboard');

        // Validate that the title “Dashboard” is visible on the page.
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text')
          .should('be.visible')
          .and('contain.text', 'Dashboard');
          });

    // ---TC3: Access to the section---
    //Steps //1.- Login successful //2.- Validation Data //3.- Click on "My Info" //4.- URL Validation //5.- Title validation
    it('TC3: Acceder a la sección My Info - Validar opciones de menú y título "Personal Details"', () => {
        // 1.- Login successful 
        cy.login(orangehrmData.validCredentials.username, orangehrmData.validCredentials.password);

        //2.- Validation Data 
        // Side menu
        cy.get('.oxd-sidepanel-body').should('be.visible');

        // Menu items
        // Validation
        cy.get('.oxd-main-menu-item').contains('Admin').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('PIM').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('Leave').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('Time').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('Recruitment').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('My Info').should('be.visible'); // Main Parameter
        cy.get('.oxd-main-menu-item').contains('Performance').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('Dashboard').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('Directory').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('Maintenance').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('Claim').should('be.visible');
        cy.get('.oxd-main-menu-item').contains('Buzz').should('be.visible');

        // 3. Access the My Info section
        cy.get('.oxd-main-menu-item').contains('My Info').click();

        // 4. Validate that the URL includes '/viewPersonalDetails/empNumber'
        cy.url().should('include', 'viewPersonalDetails/empNumber/');

        // 5. Obtain and validate the text from "Personal Details"
        cy.get('.orangehrm-main-title')
          .should('be.visible')
          .and('contain.text', 'Personal Details');
    });

    // ---TC4: Add and save personal information---
    // //Steps //1.- Login successful //2.- Navigate to the "My Info" section // 3.-Add Data //4.- Click on "Save" //5. Message validation
it('TC4: Agregar y guardar la información de Personal Details', () => {
        // 1. Login successful
        cy.login(orangehrmData.validCredentials.username, orangehrmData.validCredentials.password);

        // 2. Navigate to the "My Info" section 
        cy.get('.oxd-main-menu-item').contains('My Info').click();
        cy.url().should('include', '/viewPersonalDetails/empNumber');
        cy.get('.orangehrm-main-title').should('contain.text', 'Personal Details');
        
        //3. Add Data
        // 3.1 Employee Full Name
        // First Name
        cy.get('input[name="firstName"]').clear().type(orangehrmData.personalDetails.firstName);
        // Middle Name
        cy.get('input[name="middleName"]').clear().type(orangehrmData.personalDetails.middleName);
        // Last Name
        cy.get('input[name="lastName"]').clear().type(orangehrmData.personalDetails.lastName);

        // 3.2  Employee Id 
        cy.get('label:contains("Employee Id")').parent().next('div').find('input').clear().type(orangehrmData.personalDetails.employeeId);

        // 3.3  Driver's License Number
        cy.get('label:contains("Driver\'s License Number")').parent().next('div').find('input').clear().type(orangehrmData.personalDetails.driversLicenseNumber);

        // 3.4 Other Id
        cy.get('label:contains("Other Id")').parent().next('div').find('input').clear().type(orangehrmData.personalDetails.otherId);
        
        // 3.5License Expiry Date
        cy.get('label:contains("License Expiry Date")').parent().next('div').find('input')
        .clear()  
        .type(orangehrmData.personalDetails.licenseExpiryDate);
        cy.get('div.oxd-date-input-link.--close').click();

        //3.6  Nationality (Dropdown)
        // Click dropdown 
        cy.get('label:contains("Nationality")').parent().next('div').find('.oxd-select-wrapper').click();
        // Selection
        cy.get('.oxd-select-dropdown').contains(orangehrmData.personalDetails.nationality).click();

        // 3.7 Marital Status (Dropdown)
        // Click dropdown 
        cy.get('label:contains("Marital Status")').parent().next('div').find('.oxd-select-wrapper').click();
        // Selection
        cy.get('.oxd-select-dropdown').contains(orangehrmData.personalDetails.maritalStatus).click();

        // 3.8 Date of Birth
        cy.get('label:contains("Date of Birth")').parent().next('div').find('input').clear().type(orangehrmData.personalDetails.dateOfBirth);

        // 3.9 Gender (Radio button)
        cy.get(`label:contains("${orangehrmData.personalDetails.gender}")`).find('input[type="radio"]').check({ force: true });

        //4. Click on Save
        cy.get('button[type="submit"]').contains('Save').click();

        // 5. Message validation
        cy.get('.oxd-toast-content').should('be.visible').and('contain.text', 'Success');

        //Aditional step: Reload page
        cy.reload();
        cy.get('input[name="firstName"]').should('have.value', orangehrmData.personalDetails.firstName);
    });

    // ---TC5:Add and Save Custom Fields---
    //Steps //1.- Login successful //2.- Navigate to the "My Info" section // 3.-Add Custom Fields //4.- Click on "Save" //5. Message validation
    it('TC5: Agregar y guardar la información de Custom Fields', () => {
        // 1. Login successful
        cy.login(orangehrmData.validCredentials.username, orangehrmData.validCredentials.password);

        // 2. Navigate to the "My Info" section
        cy.get('.oxd-main-menu-item').contains('My Info').click();
        cy.url().should('include', '/viewPersonalDetails/empNumber');
        cy.get('.orangehrm-main-title').should('contain.text', 'Personal Details');
        
        // 1.Add Custom Fields// Blood Type (Dropdown)
        // Click on the dropdown associated with the “Blood Type” label.
        cy.get('label:contains("Blood Type")').parent().next('div').find('.oxd-select-wrapper').click();
        //  Select the option from the dropdown menu
        cy.get('.oxd-select-dropdown').contains(orangehrmData.customFields.bloodType).click();

        // Test_Field (Campo de texto)
        // We look for the input that is after the “Test_Field” label.
        cy.get('label:contains("Test_Field")').parent().next('div').find('input').clear().type(orangehrmData.customFields.testField);

        // --- SAVE AND VALIDATE ---

        // Click on the Save button
        cy.get('button[type="submit"]').contains('Save').click();

        // Validate success message
        cy.get('.oxd-toast-content').should('be.visible').and('contain.text', 'Success');
    });

    // ---TC6:Upload, edit, download, and delete an image.---
    //Steps // 1.- Login successful // 2.- Navigate to the "My Info" section // 3.- Navigate to the"Attachments" section // 4.- Upload imagen // 5. Edit image comment // 6. Download image// 7.Delete image
    it('TC6: Realizar acciones en la sección de Attachments: Cargar, editar, descargar y eliminar una imagen.', () => {
        // 1. Login successful
        cy.login(orangehrmData.validCredentials.username, orangehrmData.validCredentials.password);

        // 2. Navigate to the "My Info" section
        cy.get('.oxd-main-menu-item').contains('My Info').click();
        cy.url().should('include', '/viewPersonalDetails/empNumber');
        cy.get('.orangehrm-main-title').should('contain.text', 'Personal Details');
        // 3. Navigate to the Attachments section and click “Add” 
        cy.contains('h6.orangehrm-main-title', 'Attachments').should('be.visible');
        cy.contains('h6.orangehrm-main-title', 'Attachments')
        .next('button')
        .contains('Add')
        .click();
        // --- Upload an image and add a comment  ---
        const fileName = 'test_image.jpeg';
        const filePath = `cypress/fixtures/${fileName}`;
        const initialComment = 'Este es un comentario inicial para la imagen.'
        // Select the file in the “file” input (within the modal).
        cy.get('input[type="file"]').selectFile(filePath, { force: true });

        // Write the comment in the modal field 
        cy.get('textarea[placeholder="Type comment here"]').clear().type(initialComment);

        // Click on "Save" button
        const modalRootSelector = '.orangehrm-card-container';
         cy.get(modalRootSelector).last().within(() => {
            // Hacer clic en el botón "Save" ESPECÍFICO DE ESTA MODAL
            cy.get('button[type="submit"]').contains('Save').click();
        });

        //Success Message
        cy.get('.oxd-toast-content').should('be.visible').and('contain.text', 'Success');
        cy.wait(1000);
        // Verification
        cy.get('.oxd-table-body').should('be.visible').within(() => {
            cy.get('.oxd-table-row').should('contain.text', fileName);
            cy.get('.oxd-table-row').should('contain.text', initialComment);
        });

        // New comment
        const editedComment = 'Este es el comentario editado.';

        // Find the row of the uploaded file and click on the edit icon.
        cy.get('.oxd-table-body').contains(fileName).parents('.oxd-table-row')
          .find('.oxd-icon.bi-pencil-fill').click(); // Editor Icon

        // Waiting to the modal
        cy.get('textarea[placeholder="Type comment here"]').clear().type(editedComment); // New Comment

        // Click on Save button
        cy.get('button[type="submit"]').contains('Save').click(); // 
        cy.get('.oxd-toast-content').should('be.visible').and('contain.text', 'Success'); 
      });

    // ---TC7: Log out: Verify that the user can log out of the dashboard. ---
    it('TC7: Hacer logout: Validar que el usuario pueda salir del dashboard.', () => {
        // 1. Login 
        cy.login(orangehrmData.validCredentials.username, orangehrmData.validCredentials.password);

        // 2. Verification
        cy.url().should('include', '/web/index.php/dashboard/index');
        cy.get('.oxd-topbar-header-breadcrumb-module').should('contain.text', 'Dashboard');

        // 3. Dropdown of the usuar
        cy.get('.oxd-userdropdown-tab').click();

        // 4. Click on "Logout"
        cy.get('.oxd-dropdown-menu').contains('Logout').click();

        // URL login verification
        cy.url().should('include', '/web/index.php/auth/login');
    });
  });