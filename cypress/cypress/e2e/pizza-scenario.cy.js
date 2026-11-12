
 // QP-01 A custom pizza reaches the admin list
 // Goal: check that a pizza request with restrictions gives a pizza
 // that keeps them, that rating a pizza needs a login, and that the
 // admin sees the new pizza.

 describe('QP-01 A custom pizza reaches the admin list', () => {
   it('follows the steps of QP-01', () => {

     // Step 1: open QuickPizza
     cy.visit('https://quickpizza.grafana.com', {
       timeout: 30000,
     })

     cy.url().should('include', 'quickpizza.grafana.com')

     cy.get('body', { timeout: 20000 })
       .should(
         'contain.text',
         'Looking to break out of your pizza routine?'
       )

     cy.screenshot('qp01-step1-homepage')

     // Step 2: turn on Advanced
     cy.contains('label', 'Advanced', { timeout: 20000 })
       .should('be.visible')
       .click()

     cy.contains('label', 'Max Calories per Slice')
       .should('be.visible')

     cy.contains('label', 'Excluded tools')
       .should('be.visible')

     cy.contains('label', 'Must be vegetarian')
       .should('be.visible')

     cy.contains('label', 'Custom Pizza Name')
       .should('be.visible')

     // Step 3: fill in the pizza request
     const stamp = Date.now()
     const pizzaName = `Lab Pizza ${stamp}`
     let recommendedTool

     cy.contains('label', 'Max Calories per Slice')
       .siblings('input')
       .clear()
       .type('600')
       .should('have.value', '600')

     cy.get('select').select('Knife')

     cy.contains('option', 'Knife')
       .should('be.selected')

     cy.get('#default-checkbox')
       .check()
       .should('be.checked')

     cy.get('input#pizza-name')
       .clear()
       .type(pizzaName)
       .should('have.value', pizzaName)

     cy.screenshot('qp01-step3-fields')

     // Step 4: ask for a pizza
     cy.intercept('POST', '/api/pizza').as('pizza')

     cy.get('button[name="pizza-please"]')
       .click()

     cy.wait('@pizza', { timeout: 30000 })
       .its('response.statusCode')
       .should('eq', 200)

     cy.get('#recommendations', { timeout: 20000 })
       .should('contain', `Name: ${pizzaName}`)

     cy.get('#recommendations')
       .invoke('text')
       .then((text) => {
         const tool = text
           .match(/Tool:\s*(.*?)\s*Calories per slice:/)?.[1]
           ?.trim()

         const caloriesText = text
           .match(/Calories per slice:\s*(\d+)/)?.[1]

         expect(tool, 'recommended tool')
           .to.be.a('string')
           .and.not.be.empty

         expect(tool)
           .to.not.equal('Knife')

         expect(caloriesText, 'calories')
           .to.exist

         const calories = Number(caloriesText)

         expect(calories)
           .to.be.at.most(600)

         recommendedTool = tool
       })

     cy.screenshot('qp01-step4-recommendation')

     // Step 5: rate without logging in
     cy.get('button[name="rate-5"]')
       .click()

     cy.get('#rate-result')
       .should('contain', 'Please log in first.')

     cy.screenshot('qp01-step5-login-needed')

     // Step 6: log in on the admin page
     cy.adminLogin('admin', 'admin')

     cy.contains('Latest pizza recommendations', {
       timeout: 20000,
     }).should('be.visible')

     cy.screenshot('qp01-step6-after-login')

     // Step 7: verify the pizza in the admin list
     cy.contains('li', pizzaName, {
       timeout: 20000,
     })
       .should('be.visible')
       .then(($item) => {
         expect($item.text())
           .to.include(`tool=${recommendedTool}`)
       })

     cy.screenshot('qp01-step7-admin-list')
   })
 })
