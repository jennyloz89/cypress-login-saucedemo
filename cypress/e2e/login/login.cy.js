import LoginPage from '../../support/pages/LoginPage';
import DashboardPage from '../../support/pages/DashboardPage';

describe('Login - SauceDemo', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  context('Validación de elementos de la página de login', () => {
    it('Debe mostrar todos los elementos del formulario de login', () => {
      LoginPage.verifyLoginPageVisible();
      cy.takeScreenshot('login-page-elements');
    });

    it('Debe tener la URL correcta', () => {
      LoginPage.verifyUrl();
    });
  });

  context('Login con credenciales válidas', () => {
    it('Debe hacer login exitoso con usuario estándar', () => {
      cy.fixture('users').then((users) => {
        LoginPage.login(users.validUser.username, users.validUser.password);
        
        DashboardPage.verifyUrl();
        DashboardPage.verifyDashboardVisible();
        cy.takeScreenshot('login-success-standard-user');
      });
    });

    it('Debe hacer login exitoso usando comando personalizado', () => {
      cy.loginWithFixture('validUser');
      
      DashboardPage.verifyUrl();
      DashboardPage.verifyDashboardVisible();
    });

    it('Debe hacer login exitoso con usuario de performance', () => {
      cy.fixture('users').then((users) => {
        LoginPage.login(users.performanceUser.username, users.performanceUser.password);
        
        DashboardPage.verifyUrl();
        DashboardPage.verifyDashboardVisible();
        cy.takeScreenshot('login-success-performance-user');
      });
    });
  });

  context('Login con credenciales inválidas', () => {
    it('Debe mostrar error con credenciales incorrectas', () => {
      cy.fixture('users').then((users) => {
        LoginPage.login(users.invalidUser.username, users.invalidUser.password);
        
        LoginPage.verifyErrorMessage(users.errorMessages.invalidCredentials);
        cy.takeScreenshot('login-invalid-credentials');
      });
    });

    it('Debe mostrar error con usuario bloqueado', () => {
      cy.fixture('users').then((users) => {
        LoginPage.login(users.lockedUser.username, users.lockedUser.password);
        
        LoginPage.verifyErrorMessage(users.errorMessages.lockedOut);
        cy.takeScreenshot('login-locked-user');
      });
    });

    it('Debe mostrar error cuando el campo username está vacío', () => {
      cy.fixture('users').then((users) => {
        LoginPage.fillPassword(users.validUser.password);
        LoginPage.clickLogin();
        
        LoginPage.verifyErrorMessage(users.errorMessages.usernameRequired);
        cy.takeScreenshot('login-empty-username');
      });
    });

    it('Debe mostrar error cuando el campo password está vacío', () => {
      cy.fixture('users').then((users) => {
        LoginPage.fillUsername(users.validUser.username);
        LoginPage.clickLogin();
        
        LoginPage.verifyErrorMessage(users.errorMessages.passwordRequired);
        cy.takeScreenshot('login-empty-password');
      });
    });

    it('Debe mostrar error cuando ambos campos están vacíos', () => {
      cy.fixture('users').then((users) => {
        LoginPage.clickLogin();
        
        LoginPage.verifyErrorMessage(users.errorMessages.usernameRequired);
        cy.takeScreenshot('login-empty-fields');
      });
    });
  });

  context('Funcionalidad del mensaje de error', () => {
    it('Debe poder cerrar el mensaje de error', () => {
      LoginPage.clickLogin();
      LoginPage.elements.errorMessage().should('be.visible');
      
      LoginPage.closeErrorMessage();
      LoginPage.elements.errorMessage().should('not.exist');
    });
  });

  context('Seguridad y sesión', () => {
    it('No debe mantener la sesión después de logout', () => {
      // Login
      cy.loginWithFixture('validUser');
      DashboardPage.verifyDashboardVisible();
      
      // Logout
      DashboardPage.logout();
      LoginPage.verifyLoginPageVisible();
      
      // Intentar acceder directamente al inventario
      cy.visit('/inventory.html');
      LoginPage.verifyErrorMessage('You can only access');
      cy.takeScreenshot('session-security-check');
    });
  });
});

