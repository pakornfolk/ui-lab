// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

 // Log in on the QuickPizza admin page with a user name and password.
 Cypress.Commands.add('adminLogin', (user, password) => {
   cy.visit('https://quickpizza.grafana.com/admin')

   // Wait until the page script has started
   cy.get('#svelte-announcer').should('exist')

   // Clear the pre-filled values before typing
   cy.get('#username').clear().type(user)
   cy.get('#password').clear().type(password)

   cy.get('button[type="submit"]').click()
 })
