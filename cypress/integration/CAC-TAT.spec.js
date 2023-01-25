// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {

        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        
        cy.get('#firstName').type('Nome Teste')
        cy.get('#lastName').type('Sobrenome Teste')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone').type('12345')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('.button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.get('#firstName').type('Nome Teste')
        cy.get('#lastName').type('Sobrenome Teste')
        cy.get('#email').type('emailInvalido')
        cy.get('#phone').type('12345')
        cy.get('#open-text-area').type('Teste')

        cy.contains('button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Validar campo vazio ao entrar com dados não numéricos', function () {

        cy.get('#phone').type('teste')
        cy.get('#phone').should('have.text', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.get('#firstName').type('Nome Teste')
        cy.get('#lastName').type('Sobrenome Teste')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').check()
            .should('be.checked')

        cy.get('#open-text-area').type('Teste', { delay: 0 })

        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })
    it('preeenche e limpa os campos nome, sobrenome, email e telefone', function () {

        cy.get('#firstName')
            .type('Nome Teste')
            .should('have.value', 'Nome Teste')
            .clear()
            .should('have.value', '')

        cy.get('#lastName').type('Sobrenome Teste')
            .should('have.value', 'Sobrenome Teste')
            .clear()
            .should('have.value', '')

        cy.get('#email').type('email@teste.com')
            .should('have.value', 'email@teste.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone').type('32999998888')
            .should('have.value', '32999998888')
            .clear()
            .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })
    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (Youtube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu value', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })        
    it('teste a página da política de privadidade de forma independente', function(){
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.get('.privacy p')
            .should('have.length', 4)
            .should(function($textVallidation){
                console.log($textVallidation)
                expect($textVallidation[0].outerText).to.equal('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
                expect($textVallidation[1].outerText).to.equal('Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
                expect($textVallidation[2].outerText).to.equal('No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
                expect($textVallidation[3].outerText).to.equal('Talking About Testing')
            })

    })  
    
})