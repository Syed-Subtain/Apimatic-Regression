import { Urls } from "../support/URLs"
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
beforeEach(() => {
  cy.Login();
});

describe('API PlayGround Test', () => {

  Urls.forEach((url) => {
    it('Primary type Elements Validation  ', () => {
      cy.visit(url)
      cy.wait(5000)
      // Expanding Arrays and clicking on optional checkboxes
      cy.get('.chevron-icon-rotate-90').should((__) => { }).then(($el) => {
        if ($el.length > 0) {
          cy.arraysClick()
        }
      })
      
      // Finding string elements in Endpoint
      cy.get('.rjsf-field-string').should((__) => { }).then(($StringFields) => {
        if ($StringFields.length > 0) {
          cy.validateString()
        }
      })
      // Validating UUID elements in Endpoint
      cy.get('.rjsf-field-string').should((__) => { }).then(($uuid) => {
        if ($uuid.length > 0) {
          cy.validateUuid()
        }
      })

      // Validating Numeric elements in Endpoint
      cy.get('.rjsf-field-integer').should((__) => { }).then(($NumericFields) => {
        if ($NumericFields.length > 0) {
          cy.validateNumber()
        }
      })
        // Validating Decimal  elements in Endpoint
      cy.get('.rjsf-field-number').should((__) => { }).then(($decimal) => {
        if ($decimal.length > 0) {
          cy.validateDecimal()
        }
      })

      //Finding Select elements in Endpoints 
      cy.get('.react-select__control').should((__) => { }).then(($sel) => {
        if ($sel.length > 0) {
          cy.validateSelect()
        }
        })
      //Finding Boolean Elements in Endpoints     
      cy.get('.rjsf-checkbox-title').should(()=>{}).then(($checkboxes)=>{
        if($checkboxes.length>0)
        cy.validateCheckbox()
      })

      //Finding Arrays in Endpoints
        cy.get('.rjsf-field-array').should((__)=>{}).then(($ArrayFields)=>{
          if($ArrayFields.length>0)
          cy.validateArray()
      })
      
      cy.get('.rjsf-form-control.rjsf-field-datepicker').should((__) => { }).then(($date) => {
        if ($date.length > 0) {
          cy.validateDate()
        }
      })

    })
  })
})