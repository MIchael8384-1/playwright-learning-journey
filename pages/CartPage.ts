import { Page } from "@playwright/test";

export class CartPage {

    cartBadge;
    cartLink;
    title;
    cartQuantity;
    checkoutButton
    removeItems;
    continueButton;
    cartItems;
    cartProducts;
    



    constructor(private page: Page){

        this.cartBadge = this.page.locator('[data-test=shopping-cart-badge]');
        this.cartLink = this.page.locator('.shopping_cart_link');
        this.title = this.page.locator('.title');
        this.cartQuantity = this.page.locator('.cart_quantity');
        this.checkoutButton = this.page.getByRole('button', {name : 'Checkout'});
        this.removeItems = this.page.getByRole('button', {name : 'Remove'});
        this.continueButton = this.page.getByRole('button', {name: 'Continue Shopping'});
        this.cartItems = this.page.locator('.cart_item');
        this.cartProducts = this.page.locator('.inventory_item_name');
    }

    async removeItem(){
        await this.removeItems.click();
    }

    async continueShopping(){
        await this.continueButton.click()
    }

    async proceedToCheckout(){
        await this.checkoutButton.click()
    }

    async navigateToCart(){
        await this.cartLink.click();

    }






} 