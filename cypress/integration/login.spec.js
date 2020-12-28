/// <reference types="cypress"/>

import Chance from 'chance'

const chance = new Chance();

describe('Auth', () => {
    const email = chance.email();
    const username = "gekata";
    const rand_username = chance.integer();
    const pass = "password123";

    beforeEach(() => {
        cy.visit('http://localhost:8000/auth/login')
    })

    it('registers a new user', () => {
        cy.visit('http://localhost:8000/auth/register')
        cy.url().should('include', 'auth/register')
        cy.get('[data-username-input]').type("gekata" + rand_username);
        cy.get('[data-email-input]').type(email);
        cy.get('[data-password-input]').type(pass);
        cy.get('[data-submit-input]').click();

        cy.url().should('include', '/auth/login');
    })

    it('has sign in with', () => {
        cy.contains('Sign in with')
    })

    it('signs in a user', () => {

        cy.get('input[name=username]').type(username)
        cy.get('input[name=password]').type(pass)
        cy.get('button[name=login]').click();

        cy.contains('My Collection');
    })
})
