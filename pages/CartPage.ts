import { Page } from "@playwright/test";

export class CartPage {

    cartBadge;
    cartLink;
    title;
    cartQuantity;
    checkoutButton
    removeItem;
    continueButton;
    cartItems;
    cartProduct;
    cartProducts



    constructor(private page: Page){

        this.cartBadge = this.page.locator('[data-test=shopping-cart-badge]');
        this.cartLink = this.page.locator('.shopping_cart_link');
        this.title = this.page.locator('.title');
        this.cartQuantity = this.page.locator('.cart_quantity');
        this.checkoutButton = this.page.getByRole('button', {name : 'Checkout'});
        this.removeItem = this.page.getByRole('button', {name : 'Remove'});
        this.continueButton = this.page.getByRole('button', {name: 'Continue Shopping'});
        this.cartItems = this.page.locator('.cart_item');
        this.cartProduct = this.page.locator('.inventory_item_name');
        this.cartProducts = this.page.locator('[data-test="item-4-title-link"]')
    }

    async openCart(){
        await this.cartLink.click();
    }

    async deleteItem(){
        await this.removeItem.click();
    }

    async continueShopping(){
        await this.continueButton.click()
    }

    async toCheckout(){
        await this.checkoutButton.click()
    }





} 