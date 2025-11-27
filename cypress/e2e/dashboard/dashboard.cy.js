import LoginPage from '../../support/pages/LoginPage';
import DashboardPage from '../../support/pages/DashboardPage';

describe('Dashboard - SauceDemo', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.loginWithFixture('validUser');
  });

  context('Navegación al dashboard', () => {
    it('Debe navegar correctamente al dashboard después del login', () => {
      DashboardPage.verifyUrl();
      DashboardPage.verifyDashboardVisible();
      cy.takeScreenshot('dashboard-after-login');
    });
  });

  context('Verificación de elementos visibles', () => {
    it('Debe mostrar el título "Products"', () => {
      DashboardPage.elements.title()
        .should('be.visible')
        .and('have.text', 'Products');
    });

    it('Debe mostrar todos los elementos de navegación', () => {
      DashboardPage.verifyNavigationElementsVisible();
      cy.takeScreenshot('dashboard-navigation-elements');
    });

    it('Debe mostrar el footer con links sociales', () => {
      DashboardPage.verifyFooterVisible();
    });

    it('Debe mostrar los 6 productos disponibles', () => {
      DashboardPage.verifyProductsDisplayed(6);
      cy.takeScreenshot('dashboard-products-list');
    });

    it('Cada producto debe tener nombre, descripción, precio e imagen', () => {
      DashboardPage.verifyProductsHaveRequiredElements();
    });
  });

  context('Menú de navegación lateral', () => {
    it('Debe abrir y cerrar el menú lateral correctamente', () => {
      DashboardPage.openMenu();
      DashboardPage.elements.burgerMenuWrap().should('be.visible');
      cy.takeScreenshot('menu-open');
      
      DashboardPage.closeMenu();
      // El menú se oculta con animación
      cy.wait(500);
      DashboardPage.elements.burgerMenuWrap().should('have.attr', 'aria-hidden', 'true');
    });

    it('Debe mostrar todas las opciones del menú', () => {
      DashboardPage.openMenu();
      
      DashboardPage.elements.allItemsLink().should('be.visible');
      DashboardPage.elements.aboutLink().should('be.visible');
      DashboardPage.elements.logoutLink().should('be.visible');
      DashboardPage.elements.resetAppLink().should('be.visible');
      cy.takeScreenshot('menu-options');
    });
  });

  context('Funcionalidad del carrito', () => {
    it('Debe agregar un producto al carrito', () => {
      DashboardPage.verifyCartBadge(0);
      
      DashboardPage.addProductToCart(0);
      DashboardPage.verifyCartBadge(1);
      cy.takeScreenshot('product-added-to-cart');
    });

    it('Debe agregar múltiples productos al carrito', () => {
      DashboardPage.addProductToCart(0);
      DashboardPage.addProductToCart(1);
      DashboardPage.addProductToCart(2);
      
      DashboardPage.verifyCartBadge(3);
      cy.takeScreenshot('multiple-products-in-cart');
    });

    it('Debe remover un producto del carrito', () => {
      DashboardPage.addProductToCart(0);
      DashboardPage.verifyCartBadge(1);
      
      DashboardPage.removeProductFromCart(0);
      DashboardPage.verifyCartBadge(0);
      cy.takeScreenshot('product-removed-from-cart');
    });

    it('Debe navegar al carrito al hacer click en el icono', () => {
      DashboardPage.addProductToCart(0);
      DashboardPage.goToCart();
      
      cy.url().should('include', '/cart');
      cy.takeScreenshot('cart-page');
    });
  });

  context('Ordenamiento de productos', () => {
    it('Debe ordenar productos de A a Z', () => {
      DashboardPage.sortProducts('az');
      
      DashboardPage.elements.inventoryItemName().first().should('contain', 'Sauce Labs Backpack');
      cy.takeScreenshot('sort-az');
    });

    it('Debe ordenar productos de Z a A', () => {
      DashboardPage.sortProducts('za');
      
      DashboardPage.elements.inventoryItemName().first().should('contain', 'Test.allTheThings()');
      cy.takeScreenshot('sort-za');
    });

    it('Debe ordenar productos por precio de menor a mayor', () => {
      DashboardPage.sortProducts('lohi');
      
      DashboardPage.elements.inventoryItemPrice().first().should('contain', '$7.99');
      cy.takeScreenshot('sort-price-low-high');
    });

    it('Debe ordenar productos por precio de mayor a menor', () => {
      DashboardPage.sortProducts('hilo');
      
      DashboardPage.elements.inventoryItemPrice().first().should('contain', '$49.99');
      cy.takeScreenshot('sort-price-high-low');
    });
  });

  context('Navegación a detalle de producto', () => {
    it('Debe navegar al detalle del producto al hacer click en el nombre', () => {
      DashboardPage.clickOnProduct(0);
      
      cy.url().should('include', '/inventory-item');
      cy.get('.inventory_details').should('be.visible');
      cy.takeScreenshot('product-detail');
    });
  });

  context('Logout', () => {
    it('Debe cerrar sesión correctamente', () => {
      DashboardPage.logout();
      
      LoginPage.verifyLoginPageVisible();
      LoginPage.verifyUrl();
      cy.takeScreenshot('logout-success');
    });
  });

  context('Reset App State', () => {
    it('Debe resetear el estado de la aplicación', () => {
      // Agregar productos al carrito
      DashboardPage.addProductToCart(0);
      DashboardPage.addProductToCart(1);
      DashboardPage.verifyCartBadge(2);
      
      // Resetear estado
      DashboardPage.resetAppState();
      
      // Verificar que el carrito está vacío
      DashboardPage.verifyCartBadge(0);
      cy.takeScreenshot('app-state-reset');
    });
  });
});

