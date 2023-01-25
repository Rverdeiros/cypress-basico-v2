Cypress._.times(5, function () { //Comando para rodas o mesmo teste várias vezes. Nesse caso, 05 vezes.

    it('teste a página da política de privadidade de forma independente', function () {
        cy.visit('./src/index.html')
        
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.get('.privacy p')
            .should('have.length', 4)
            .should(function ($textVallidation) {
                console.log($textVallidation)
                expect($textVallidation[0].outerText).to.equal('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
                expect($textVallidation[1].outerText).to.equal('Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
                expect($textVallidation[2].outerText).to.equal('No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
                expect($textVallidation[3].outerText).to.equal('Talking About Testing')
            })

    })

})