/// <reference types="cypress"/>

import Chance from 'chance'

const chance = new Chance();

describe('Login', () => {
    const email = chance.email();
    const username = "gekata";
    const pass = "password123";

    beforeEach(() => {
        cy.visit('http://localhost:8000/auth/login')
    })

    it('has sign in with', () => {
        cy.contains('Sign in with')
    })

    it('signs in a user', () => {

        cy.get('input[name=username]').type(username)
        cy.get('input[name=password').type(pass)
        cy.get('button[name=login]').click();

        cy.contains('My Collection');
    })
})
