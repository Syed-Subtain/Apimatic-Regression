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
import { faker } from '@faker-js/faker'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
//https://on.cypress.io/custom-commands
// ***********************************************

//
// -- This is a parent command --
//Cypress.Commands.add('login', (email, password) => { ... })



const username = "syed.subtain@apimatic.io";
const password = "Welcome@1";


Cypress.Commands.add("Login", () => {
    cy.session([username, password], () => {
        cy.visit("/account/login");
        cy.get("#Email").type(username);
        cy.get("#js-onboarding-password-field").type(password);
        cy.get(".btn-primary").click();
        cy.url().should("include", "/dashboard");
        cy.contains("Manage your APIs!", { timeout: 50000 }).should("be.visible");
        cy.get("body").then(($body) => {
            if ($body.find('[ng-click="$ctrl.close()"]').length > 0) {
                //evaluates as true
                cy.xpath(
                    "/html/body/div[1]/div/div/signup-onboarding/div/div[1]/div[2]/button[1]"
                ).click();
            }
        });
    });
});

Cypress.Commands.add('validateString', () => {
  cy.get('.rjsf-field-string').each(($StringFields) => {
    const type = $StringFields.text()
    cy.log(type)
    if (type.includes('String')) {
      const randomWord = faker.random.word()
      cy.wrap($StringFields).find('input[type="text"]').clear().type(randomWord)
    }

  })
})

Cypress.Commands.add("validateUuid", () => {
  cy.get('.rjsf-field-string').each(($uuid) => {
    const type = $uuid.text()
    cy.log(type)
    if (type.includes('UUID')) {
      const randomUuid = faker.datatype.uuid()
      cy.wrap($uuid).find('input[type="text"]').clear().type(randomUuid.toString())
    }
  })
})

Cypress.Commands.add('validateNumber', () => {
    cy.get('.rjsf-field-integer').each(($NumericFields) => {
        const type = $NumericFields.text()
        cy.log(type)
        if (type.includes('Number')) {
            const randomNum = faker.datatype.number({ max: 1000 })
            cy.wrap($NumericFields).find('input[type="text"]').clear().type(randomNum)
        }
    })
})


Cypress.Commands.add('validateDecimal', () => {
  cy.get('.rjsf-field-number').each(($decimal) => {
    const type = $decimal.text()
    cy.log(type)
    if (type.includes('Decimal')) {
      const randomName = faker.datatype.float({ min: 1.0, max: 100.0 })
      cy.wrap($decimal).find('input[type="text"]').clear().type(randomName)
    }
  })
})


Cypress.Commands.add('validateCheckbox',()=>{
  cy.get('.rjsf-checkbox-title').each(($checkbox)=>{
    cy.wrap($checkbox).find('.unchecked').should(()=>{}).then(($unchecked)=>{
      if($unchecked.length>0) {
      cy.wrap($unchecked).check({force:true})
      }
      else
      cy.wrap($checkbox).find('.checked').uncheck({force:true})
      cy.get('[data-testid="alert_callout"]').should("not.exist") && cy.get('[data-testid="error_callout"]').should("not.exist");
    })
  })
})

Cypress.Commands.add('validateSelect', () => { 
  cy.get('.react-select__control')
    .each(($sel) => {
    cy.wrap($sel)
    .click({force: true , multiple: true})
    .should('have.class', 'react-select__control--menu-is-open' )
    cy.get('.react-select__menu-list > .react-select__option')
    .then(($list)=>{
      if($list.length >= 1)
      cy.wrap($list).eq(3).click({ force: true })
      cy.get('body').click(0, 0);
    })
  })
})

Cypress.Commands.add('validateDate', () => {
  cy.get('.rjsf-field-datepicker')
    .each(($date) => {
      cy.wrap($date).click().clear()
      cy.get('.react-datepicker-ignore-onclickoutside')
        .should('exist').should('have.value', "")
      cy.get('.react-datepicker__today-button').click()
      cy.get('body').click(0, 0);
    })
})

Cypress.Commands.add('validateArray', () => {
    cy.get('.rjsf-field-array > .rjsf-object-header > .rjsf-btn').then(($playground) => {
        cy.log($playground.text());

        cy.wrap($playground).click({ multiple: true, force: true });
    })
})

Cypress.Commands.add('validateDateTime', () => {
  cy.get('.rjsf-field-datepicker')
    //.should('have.attr', 'placeholder', 'Select a date and time')
    .each(($datetime) => {
      cy.wrap($datetime).click({ force: true }, { multiple: true }).clear()
      cy.get('.react-datepicker-ignore-onclickoutside')
        .should('exist').should('have.value', "")
      cy.get('.react-datepicker__today-button').click()
      cy.get('.react-datepicker__time-list').find('li').eq(3).click()
      cy.get('[data-testid="alert_callout"]').should("not.exist") && cy.get('[data-testid="error_callout"]').should("not.exist");
    })
})

   

Cypress.Commands.add('validateArray', () => {
  cy.get('.rjsf-field-array > .rjsf-object-header > .rjsf-btn').then(($playground) => {
    cy.log($playground.text());
    cy.wrap($playground).click({ multiple: true, force: true });
  })
})

// Function to click to Open array Elements
let limit = 5;
Cypress.Commands.add('arraysClick', () => {
    cy.get('.chevron-icon-rotate-90').should((__) => { }).then(($el) => {
        if ($el.length > 0) {
            cy.wrap($el).click({ force: true, multiple: true })
            cy.get('[data-testid="alert_callout"]').should("not.exist") && cy.get('[data-testid="error_callout"]').should("not.exist");
            cy.wait(2000)
            limit--;
            if (limit >= 1) {
                cy.clickCheckBox()
                cy.arraysClick(limit)
            }
        }
    })
  })


//Function to check the checkboxes
Cypress.Commands.add('clickCheckBox', () => {
    cy.get('input[class="unchecked"]').should((__) => { }).then(($checkbox) => {
        if ($checkbox.length > 0)
            cy.wrap($checkbox).click({ force: true, multiple: true })
            cy.get('[data-testid="alert_callout"]').should("not.exist") && cy.get('[data-testid="error_callout"]').should("not.exist");
    })
})

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