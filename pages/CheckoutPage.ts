import {Page} from "@playwright/test"

export class CheckoutPage {

    title;
    firstNameField;
    lastNameField;
    postalCodeField;
    continue;
    productInformation;
    finish;
    checkoutComplete;
    home;
    errorMessage;
    cancel;
    checkoutProducts
    

    

    constructor(private page : Page){
        this.title =  this.page.locator('.title');
        this.firstNameField = this.page.getByPlaceholder('First Name');
        this.lastNameField = this.page.getByPlaceholder('Last Name');
        this.postalCodeField = this.page.getByPlaceholder('Zip/Postal Code');
        this.continue = this.page.getByRole('button', {name : 'Continue'});
        this.productInformation = this.page.locator('.summary_info');
        this.finish = this.page.getByRole('button', {name : 'Finish'});
        this.checkoutComplete = this.page.locator('.complete-header');
        this.home = this.page.getByRole('button', {name : 'Back Home'});
        this.errorMessage = this.page.locator('[data-test="error"]');
        this.cancel = this.page.getByRole('button', {name : 'Cancel'});
        this.checkoutProducts = this.page.locator('[data-test="item-4-title-link"]');
    }

    async submitCheckoutInformation(firstName : string, lastName: string, postalCode: string){
       await this.enterFirstName(firstName);
       await this.enterLastName(lastName)
       await this.enterPostalCode(postalCode);
       await this.clickContinue();
    }

    async enterFirstName(firstName: string){
        await this.firstNameField.fill(firstName)
    }

    async enterLastName(lastName: string){
        await this.lastNameField.fill(lastName);
    }

    async enterPostalCode(postalCode : string){
        await this.postalCodeField.fill(postalCode);
    }

    async clickContinue(){
        await this.continue.click();
    }

    async finishCheckout(){
        await this.finish.click();
    }

    async returnHome(){
        await this.home.click();
    }

    async cancelPurchase(){
        await this.cancel.click();
    }

}





