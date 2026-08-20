import {Page} from "@playwright/test"

export class CheckoutPage {

    title;
    firstNamefield;
    lastNameField;
    postalCodeField;
    continue;
    checkoutOverviewTitle;
    paymentInformation;
    shippingInformation;
    priceTotal;
    finish;
    titleComplete;
    checkoutComplete;
    home;
    errorMessage;
    cancel;
    checkoutProducts
    

    

    constructor(private page : Page){
        this.title =  this.page.locator('.title');
        this.firstNamefield = this.page.getByPlaceholder('First Name');
        this.lastNameField = this.page.getByPlaceholder('Last Name');
        this.postalCodeField = this.page.getByPlaceholder('Zip/Postal Code');
        this.continue = this.page.getByRole('button', {name : 'Continue'});
        this.paymentInformation = this.page.locator('.summary_info');
        this.shippingInformation = this.page.locator('.summary_info');
        this.priceTotal = this.page.locator('.summary_info');
        this.finish = this.page.getByRole('button', {name : 'Finish'});
        this.checkoutComplete = this.page.locator('.complete-header');
        this.home = this.page.getByRole('button', {name : 'Back Home'});
        this.errorMessage = this.page.locator('[data-test="error"]');
        this.cancel = this.page.getByRole('button', {name : 'Cancel'});
        this.checkoutProducts = this.page.locator('[data-test="item-4-title-link"]');
    }

    async checkoutInformation(firstName : string, lastName: string, postalCode: string){
       await this.enterFirstName(firstName);
       await this.enterLastName(lastName)
       await this.enterPostalCode(postalCode);
       await this.clickContinue();
    }

    async enterFirstName(firstName: string){
        await this.firstNamefield.fill(firstName)
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

    async completeCheckout(){
        await this.finish.click();
    }

    async returnHome(){
        await this.home.click();
    }

    async cancelPurchase(){
        await this.cancel.click();
    }

}





