import { Page } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { CartPage } from "./pages/CartPage";
import { InventoryPage } from "./pages/InventoryPage";
import { CheckoutPage } from "./pages/CheckoutPage";

export class TestSetup{

    loginPage;
    inventoryPage;
    cartPage;
    checkoutPage;



    constructor(private page:Page){

        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);


    }

    async toPage(url:string){
        await this.page.goto(url);
    }

    async prepareApplication(url:string, username: string, password : string){

        const loginPage = new LoginPage(this.page);

        await this.page.goto(url);
        await loginPage.login(username, password);

    }

   
  



}