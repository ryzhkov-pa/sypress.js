import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
      cy.visit('/');
      cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
        });

    it('Верный пароль и верный логин', function () {
         cy.get('#mail').type(data.login);
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })
    it('Восстановление пароля', function () {
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type(data.login);
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })
     it('Не верный пароль и верный логин', function () {
        cy.get('#mail').type(data.login);
        cy.get('#pass').type('iLoveqastudio7');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })
     it('Верный пароль и не верный логин', function () {
        cy.get('#mail').type('german@dolniko.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })
     it('Верный пароль и верный логин без @', function () {
        cy.get('#mail').type('germandolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
     })
     it('Верный пароль и верный логин c БОЛЬШИМИ БУКВАМИ', function () {
        cy.get('#mail').type('GerMan@dolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
     })
    
 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 