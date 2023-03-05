///<reference types = "Cypress"/>

describe('The sanity test suite for travel site', () => {

    //     // Cypress.on('uncaught:exception',(err, runnable)=> {
    //     // // returning false here prevents Cypress from
    //     // // failing the test
    //     // // esli yge est' owibka na site
    //     //   return false
    //     // })

    describe('Main menu 1 - Class 1:', () => {
        beforeEach(() => {
            cy.visit('https://www.accesstravel.com/en-US/Home/Index')
        })
        it('Has the correct categories and menu options', () => {
            cy.visit('https://www.accesstravel.com/en-US/Home/Index')

            const categories = ['Hotels', 'Guides', 'Tours', 'Things to do']
            categories.forEach(category => {
                cy.get('.nav-menu').contains(category).should('be.visible')
            })
        })
        // Verify that clicking each one navigates to the correct page
        it('Verify that clicking and navigates to the Hotels', () => {
            cy.get('.nav-menu').contains('Hotels').click()
            cy.url().should('include', 'https://www.accesstravel.com/en-US/Hotel/List')
        })

        it('Verify that clicking and navigates to the Guides', () => {
            cy.get('.nav-menu').contains('Guides').click()
            cy.url().should('include', 'https://www.accesstravel.com/en-US/Guide/List?DestinationId=2')
        })

        it('Verify that clicking and navigates to the Tours', () => {
            cy.get('.nav-menu').contains('Tours').click()
            cy.url().should('include', 'https://www.accesstravel.com/en-US/Tour/List?DestinationId=2')
        })

        it('Verify that clicking and navigates to the Things to do', () => {
            cy.get('.nav-menu').contains('Things to do').click()
            cy.url().should('include', 'https://www.accesstravel.com/en-US')
        })

        it('Verify that clicking on Login and Signup opens dedicated pages', () => {
            cy.get('.nav-access').contains('Login').should('have.attr', 'href', '/en-US/Account/Login')
            cy.get('.nav-access').contains('Login').click()
            cy.url().should('include', '/en-US/Account/Login')

            cy.get('.nav-access').contains('Signup').should('have.attr', 'href', '/en-US/Account/Register')
            cy.get('.nav-access').contains('Signup').click()
            cy.url().should('include', '/en-US/Account/Register')
        })
    })


    describe('Main menu 2 - Class 1:', () => {
        it('Main menu (sanity test)', () => {
            cy.visit('https://www.accesstravel.com/en-US/Home/Index')
            cy.contains('Hotels')
            cy.contains('Guides')
            cy.contains('Tours')
            cy.contains('Things to do')

            cy.contains('Hotels').click({ force: true })
            cy.url().should('include', '/Hotel/List')
            cy.contains('Guides').click({ force: true })
            cy.url().should('include', '/Guide/List')
            cy.contains('Tours').click({ force: true })
            cy.url().should('include', '/Tour/List')
            //   cy.contains('TThings to do').click({force: true})
            //   cy.url().should('include', 'href="/en-US"')

            cy.contains('Login').click()
            cy.url().should('include', '/Account/Login')
            cy.contains('Signup').click()
            cy.url().should('include', '/Account/Register')
        })
    })

    describe('Class 2', () => {

        it('Hotels Page', () => {
            cy.visit('https://www.accesstravel.com/en-US/Hotel/List')
        })

        it('Positive tests: Jerusalem, London, and New York', () => {
            cy.visit('https://www.accesstravel.com/en-US/Hotel/List')

            // Positive tests: Jerusalem, London, and New York are on the list, and a search in these cities is working
            cy.get('[value="8"]').should('be.visible')
            cy.get('[name="Filter.DestinationId"]').select('Jerusalem', { force: true })

            cy.get('[value="31"]').should('be.visible')
            cy.get('[name="Filter.DestinationId"]').select('London', { force: true })

            cy.get('[value="51"]').should('be.visible')
            cy.get('[name="Filter.DestinationId"]').select('New York', { force: true })
        })


        // Positive test: number of children - choosing a valid number of children will open a 
        // new filter of ages, the filter is functional and could be used for the search (results found)

        // Some fields could be displayed on the screen after some actions from the user/automation side. 
        // See this example for kids/ages fields:
        it('Positive test: number of children', () => {
            cy.visit('https://www.accesstravel.com/en-US/Hotel/List')
            cy.get('#Filter_ChildrenNum').should('be.visible')
            cy.get('#Filter_ChildrenNum').clear().type('1').should('have.value', '1', { force: true })

            //the following click is used just to click on the screen and refresh it to make cypress see the new fields
            cy.get('.hotels-wrap').click()
            cy.get('[class="row children-age"]').should('be.visible')
            cy.get('[name="Filter.ChildrensAge[0]').clear().type('1', { force: true })
        })


        it('Negative Test - dates: invalid dates will trigger an error', () => {
            cy.visit('https://www.accesstravel.com/en-US/Hotel/List')
            cy.get('[name="Filter.DestinationId"]').select('Jerusalem', { force: true })
            cy.get('[name="Filter.CheckIn"]').clear();
            cy.get('[name="Filter.CheckIn"]').type('2023-03-15')

            cy.get('[name="Filter.CheckOut"]').clear();
            cy.get('[name="Filter.CheckOut"]').type('2023-03-07')
            cy.contains('Search').click()
            cy.contains('Invalid Check out Date')
        })
        it('Negative Test - adults: invalid number of adults will trigger an error', () => {
            cy.visit('https://www.accesstravel.com/en-US/Hotel/List')
            cy.get('[name="Filter.DestinationId"]').select('Jerusalem', { force: true })
            cy.get('[name="Filter.AdultNum"]').clear();
            cy.get('[name="Filter.AdultNum"]').type('0')
            cy.contains('Search').click()
            cy.get('.field-validation-error').should('have.value', '')
        })

        it('Negative Test - children: invalid number of children will trigger an error', () => {
            cy.visit('https://www.accesstravel.com/en-US/Hotel/List')
            cy.get('[name="Filter.DestinationId"]').select('Jerusalem', { force: true })
            cy.get('[name="Filter.ChildrenNum"]').clear();
            cy.get('[name="Filter.ChildrenNum"]').type('-1')
            cy.contains('Search').click()
            cy.get('.field-validation-error').should('have.value', '')


        })

    })

})


