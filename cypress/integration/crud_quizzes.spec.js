/// <reference types="cypress"/>

import Chance from 'chance'

const chance = new Chance();

describe('Create', () => {
    const email = chance.email();
    const username = "gekata";
    const pass = "password123";
    const name = chance.name();

    beforeEach(() => {
        cy.visit('http://localhost:8000/auth/login')
    })

    it('has sign in with', () => {
        cy.contains('Sign in with')
    })

    it('createQuizz', () => {

        cy.get('input[name=username]').type(username)
        cy.get('input[name=password').type(pass)
        cy.get('button[name=login]').click();

        cy.contains('My Collection').click();

        cy.url().should('include','mycollection');

        cy.get('.fa-plus-circle').click();
        cy.get('input#name').type(name);
        cy.get('input#topic').type('topic123');
        cy.get('input#number_of_questions').type('123')
        cy.get('button#createQuizzz').click();

        cy.contains(name);
    })


})
