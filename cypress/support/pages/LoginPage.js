class LoginPage {
  // Selectores
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    errorButton: () => cy.get('.error-button'),
    logo: () => cy.get('.login_logo'),
    loginCredentials: () => cy.get('#login_credentials'),
    loginPassword: () => cy.get('.login_password')
  };

  // Acciones
  visit() {
    cy.visit('/', {
      timeout: 120000,
      failOnStatusCode: false
    });
  }

  fillUsername(username) {
    if (username) {
      this.elements.usernameInput().clear().type(username);
    }
    return this;
  }

  fillPassword(password) {
    if (password) {
      this.elements.passwordInput().clear().type(password);
    }
    return this;
  }

  clickLogin() {
    this.elements.loginButton().click();
    return this;
  }

  login(username, password) {
    if (username) {
      this.fillUsername(username);
    }
    if (password) {
      this.fillPassword(password);
    }
    this.clickLogin();
    return this;
  }

  clearFields() {
    this.elements.usernameInput().clear();
    this.elements.passwordInput().clear();
    return this;
  }

  closeErrorMessage() {
    this.elements.errorButton().click();
    return this;
  }

  // Verificaciones
  verifyErrorMessage(message) {
    this.elements.errorMessage().should('be.visible').and('contain', message);
    return this;
  }

  verifyErrorMessageExact(message) {
    this.elements.errorMessage().should('be.visible').and('have.text', message);
    return this;
  }

  verifyLoginPageVisible() {
    this.elements.usernameInput().should('be.visible');
    this.elements.passwordInput().should('be.visible');
    this.elements.loginButton().should('be.visible');
    return this;
  }

  verifyUrl() {
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
    return this;
  }

  verifyCredentialsInfoVisible() {
    this.elements.loginCredentials().should('be.visible');
    this.elements.loginPassword().should('be.visible');
    return this;
  }
}

export default new LoginPage();

