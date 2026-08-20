import { Page } from "@playwright/test";

export class InventoryPage {

    productItems;
    productName;
    productPrice;
    productButtons;
    sortOption;
    sortContainer;
    productBackpack;
    productTshirt;
    cartBadge

    constructor(private page : Page){

        this.productItems = this.page.locator('.inventory_item');
        this.productName = this.page.locator('.inventory_item_name');
        this.productPrice = this.page.locator('.inventory_item_price');
        this.productButtons = this.page.locator('.btn_inventory');
        this.sortOption = this.page.locator('.active_option');
        this.sortContainer = this.page.locator('.product_sort_container');
        this.productBackpack = this.page.locator('[data-test=add-to-cart-sauce-labs-backpack]');
        this.productTshirt = this.page.locator('[data-test=add-to-cart-sauce-labs-bolt-t-shirt]');
        this.cartBadge = this.page.locator('[data-test=shopping-cart-badge]');
    }

    async sortProducts(value: string){
        await this.sortContainer.selectOption(value);
    }

    async addProductTocart(){
        await this.productButtons.first().click();
    }



}