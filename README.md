# Orangehrm
# Prueba Técnica QA Engineer: Web y Bot

Este repositorio contiene la solución a la prueba técnica de QA Engineer, enfocándose en la automatización de pruebas para una plataforma web (OrangeHRM), junto con la configuración de un pipeline de CI/CD utilizando GitHub Actions.

---
## Objetivo
Evaluar las habilidades técnicas en la automatización de pruebas (Cypress, JavaScript), gestión de versiones (Git/GitHub) y CI/CD.
---
## Requisitos Generales

*   **Herramienta de automatización**: Cypress
*   **Lenguaje**: JavaScript
*   **Versionado**: Git / GitHub
*   **CI/CD**: GitHub Actions
*   **Documentación**: `README.md`
---
## ¿Cómo Empezar?
### 1. Clonar el Repositorio

git clone https://github.com/casasolareyessalmaconcepcion-blip/Orangehrm.git

cd Orangehrm
### 2. Instalación de Node.js y npm
Asegúrate de tener Node.js y npm (que viene con Node.js) instalados en tu sistema. Se recomienda la versión LTS.
### 3. Instalación de Dependencias
Una vez en la raíz del proyecto, instala todas las dependencias necesarias, incluyendo Cypress y el plugin cypress-file-upload:

npm install
### 4. Configuración de PowerShell (Solo Windows)
Si utilizas PowerShell en Windows y experimentas errores relacionados con la política de ejecución de scripts,cambia la configuración. Abre PowerShell como administrador y ejecuta:

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Luego, escribe Y y presiona Enter para confirmar. Cierra y vuelve a abrir tu terminal de VS Code.

### 5. Configuración de cypress-file-upload
El plugin cypress-file-upload ya se instala con npm install. Para que sus comandos estén disponibles globalmente en tus pruebas, asegúrate de que tu archivo cypress/support/commands.js contenga la siguiente línea al inicio:
javascript
// cypress/support/commands.js
import 'cypress-file-upload';
// ... el resto de tus comandos ...

### 6. Archivos de Pruebas (Fixtures)
Asegúrate de que tus archivos de fixtures (cypress/fixtures/orangehrm_data.json) y cualquier archivo de imagen (ej. test_image.jpeg para TC6) estén presentes en la carpeta cypress/fixtures/. El archivo orangehrm_data.json debe contener las credenciales y datos de prueba necesarios.
(Nota: La imagen test_image.jpeg debe existir en cypress/fixtures/.)

### 7. Manejo de Excepciones No Controladas (Uncaught Exceptions)
Para evitar que las pruebas fallen por errores JavaScript no relacionados con la lógica de la prueba errores de librerías de terceros o redirecciones inesperadas), se ha configurado Cypress para ignorar las uncaught:exception. Este código se encuentra en cypress/support/e2e.js

### 8. Ejecutar las Pruebas Localmente
Puedes ejecutar las pruebas de Cypress de las siguientes maneras:
Abrir la Interfaz de Usuario de Cypress (Cypress Test Runner)
Esto abrirá la interfaz gráfica de Cypress, donde puedes seleccionar y ejecutar pruebas individualmente, ver los pasos en tiempo real y depurar fácilmente.

npx cypress open

Ejecutar todas las pruebas en modo Headless (línea de comandos)
Esto ejecutará todas las pruebas en un navegador sin interfaz gráfica y generará los informes.

### Estructura del Proyecto
qa-tech-test/

├── cypress/                  # Contiene todos los archivos de Cypress

│   ├── e2e/                  # Archivos de especificación de las pruebas E2E

│   │   └── web/

│   │       └── orangehrm.cy.js  # Pruebas para OrangeHRM

│   ├── fixtures/             # Datos de prueba (JSON, imágenes, etc.)

│   │   ├── orangehrm_data.json

│   │   └── test_image.jpeg

│   └── support/              # Comandos personalizados y configuraciones globales
│       ├── commands.js       # Comandos personalizados (ej. cy.login())
│       └── e2e.js            # Archivo principal de soporte (manejo de uncaught:exception)
├── cypress.config.js         # Archivo de configuración principal de Cypress
├── package.json              # Metadatos del proyecto y dependencias
├── package-lock.json         # Bloqueo de versiones de dependencias
├── README.md                 # Este archivo
└── .gitignore                # Archivos ignorados por Git

npx cypress run

(Ejecutar pruebas específicas)

# Para las pruebas de la plataforma web (OrangeHRM)

npx cypress run --spec "cypress/e2e/web/orangehrm.cy.js"
