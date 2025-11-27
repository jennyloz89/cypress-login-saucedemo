class DashboardPage {
  // Selectores
  elements = {
    title: () => cy.get('.title'),
    inventoryList: () => cy.get('.inventory_list'),
    inventoryItems: () => cy.get('.inventory_item'),
    inventoryItemName: () => cy.get('.inventory_item_name'),
    inventoryItemPrice: () => cy.get('.inventory_item_price'),
    inventoryItemDescription: () => cy.get('.inventory_item_desc'),
    inventoryItemImage: () => cy.get('.inventory_item_img'),
    addToCartButtons: () => cy.get('[data-test^="add-to-cart"]'),
    removeButtons: () => cy.get('[data-test^="remove"]'),
    shoppingCart: () => cy.get('.shopping_cart_link'),
    shoppingCartBadge: () => cy.get('.shopping_cart_badge'),
    burgerMenu: () => cy.get('#react-burger-menu-btn'),
    burgerMenuWrap: () => cy.get('.bm-menu-wrap'),
    allItemsLink: () => cy.get('#inventory_sidebar_link'),
    aboutLink: () => cy.get('#about_sidebar_link'),
    logoutLink: () => cy.get('#logout_sidebar_link'),
    resetAppLink: () => cy.get('#reset_sidebar_link'),
    closeMenuButton: () => cy.get('#react-burger-cross-btn'),
    sortDropdown: () => cy.get('[data-test="product_sort_container"]'),
    footer: () => cy.get('.footer'),
    socialLinks: () => cy.get('.social')
  };

  // Verificaciones
  verifyDashboardVisible() {
    this.elements.title().should('be.visible').and('contain', 'Products');
    this.elements.inventoryList().should('be.visible');
    return this;
  }

  verifyUrl() {
    cy.url().should('include', '/inventory');
    return this;
  }

  verifyProductsDisplayed(expectedCount = 6) {
    this.elements.inventoryItems().should('have.length', expectedCount);
    return this;
  }

  verifyProductsHaveRequiredElements() {
    this.elements.inventoryItems().each(($item) => {
      cy.wrap($item).find('.inventory_item_name').should('be.visible');
      cy.wrap($item).find('.inventory_item_price').should('be.visible');
      cy.wrap($item).find('.inventory_item_desc').should('be.visible');
      cy.wrap($item).find('img').should('be.visible');
      cy.wrap($item).find('button').should('be.visible');
    });
    return this;
  }

  verifyNavigationElementsVisible() {
    this.elements.shoppingCart().should('be.visible');
    this.elements.burgerMenu().should('be.visible');
    this.elements.sortDropdown().should('be.visible');
    return this;
  }

  verifyFooterVisible() {
    this.elements.footer().should('be.visible');
    this.elements.socialLinks().should('be.visible');
    return this;
  }

  // Acciones
  openMenu() {
    this.elements.burgerMenu().click();
    this.elements.burgerMenuWrap().should('be.visible');
    return this;
  }

  closeMenu() {
    this.elements.closeMenuButton().click();
    return this;
  }

  logout() {
    this.openMenu();
    this.elements.logoutLink().click();
    return this;
  }

  clickAllItems() {
    this.openMenu();
    this.elements.allItemsLink().click();
    return this;
  }

  resetAppState() {
    this.openMenu();
    this.elements.resetAppLink().click();
    this.closeMenu();
    return this;
  }

  goToCart() {
    this.elements.shoppingCart().click();
    return this;
  }

  addProductToCart(index = 0) {
    this.elements.addToCartButtons().eq(index).click();
    return this;
  }

  removeProductFromCart(index = 0) {
    this.elements.removeButtons().eq(index).click();
    return this;
  }

  sortProducts(option) {
    this.elements.sortDropdown().select(option);
    return this;
  }

  verifyCartBadge(count) {
    if (count > 0) {
      this.elements.shoppingCartBadge().should('be.visible').and('have.text', count.toString());
    } else {
      this.elements.shoppingCartBadge().should('not.exist');
    }
    return this;
  }

  clickOnProduct(index = 0) {
    this.elements.inventoryItemName().eq(index).click();
    return this;
  }
}

export default new DashboardPage();

