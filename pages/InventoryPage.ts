import { Page } from "@playwright/test";

export class InventoryPage {

    productItems;
    productName;
    productPrice;
    productButtons;
    sortOption;
    sortContainer;
    cartBadge;
    itemDescription

    constructor(private page : Page){

        this.productItems = this.page.locator('.inventory_item');
        this.productName = this.page.locator('.inventory_item_name');
        this.productPrice = this.page.locator('.inventory_item_price');
        this.productButtons = this.page.locator('.btn_inventory');
        this.sortOption = this.page.locator('.active_option');
        this.sortContainer = this.page.locator('.product_sort_container');
        this.cartBadge = this.page.locator('[data-test=shopping-cart-badge]');
        this.itemDescription = this.page.locator('.inventory_item_description');
    }

    async sortProducts(value: string){
        await this.sortContainer.selectOption(value);
    }

   async addProductToCart(product: string){
        await this.itemDescription.filter({hasText: product}).getByRole('button', {name : 'Add to cart'}).click();
   }


}