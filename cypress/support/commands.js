// ***********************************************
// Comandos personalizados para Cypress
// ***********************************************

/**
 * Comando de login básico
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 */
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

/**
 * Login usando datos de fixtures
 * @param {string} userType - Tipo de usuario definido en fixtures (validUser, lockedUser, etc.)
 */
Cypress.Commands.add('loginWithFixture', (userType) => {
  cy.fixture('users').then((users) => {
    const user = users[userType];
    if (!user) {
      throw new Error(`Usuario tipo "${userType}" no encontrado en fixtures`);
    }
    if (user.username && user.password) {
      cy.login(user.username, user.password);
    } else if (user.username) {
      cy.get('[data-test="username"]').clear().type(user.username);
      cy.get('[data-test="login-button"]').click();
    } else if (user.password) {
      cy.get('[data-test="password"]').clear().type(user.password);
      cy.get('[data-test="login-button"]').click();
    } else {
      cy.get('[data-test="login-button"]').click();
    }
  });
});

/**
 * Login directo y verificar que llegó al dashboard
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 */
Cypress.Commands.add('loginAndVerify', (username, password) => {
  cy.login(username, password);
  cy.url().should('include', '/inventory');
  cy.get('.title').should('contain', 'Products');
});

/**
 * Tomar screenshot con nombre descriptivo
 * @param {string} name - Nombre del screenshot
 */
Cypress.Commands.add('takeScreenshot', (name) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  cy.screenshot(`${name}_${timestamp}`, { capture: 'fullPage' });
});

/**
 * Verificar que un elemento es visible y contiene texto
 * @param {string} selector - Selector del elemento
 * @param {string} text - Texto esperado
 */
Cypress.Commands.add('verifyElementWithText', (selector, text) => {
  cy.get(selector).should('be.visible').and('contain', text);
});

/**
 * Agregar producto al carrito por índice
 * @param {number} index - Índice del producto (0-based)
 */
Cypress.Commands.add('addToCart', (index = 0) => {
  cy.get('[data-test^="add-to-cart"]').eq(index).click();
});

/**
 * Verificar cantidad de items en el carrito
 * @param {number} count - Cantidad esperada de items
 */
Cypress.Commands.add('verifyCartCount', (count) => {
  if (count > 0) {
    cy.get('.shopping_cart_badge').should('have.text', count.toString());
  } else {
    cy.get('.shopping_cart_badge').should('not.exist');
  }
});

/**
 * Logout del sistema
 */
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
  cy.url().should('eq', Cypress.config('baseUrl') + '/');
});

