import { Page } from "@playwright/test"
export class LoginPage {
    //Variable
   
    usernameField;
    passwordField;
    loginButton;
    errorMessage;
    errorMessgaeContainer

    constructor(private page: Page) {
        //locators
       
        this.usernameField = this.page.getByPlaceholder('Username');
        this.passwordField = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', {name : 'Login'});
        this.errorMessage = this.page.locator('[data-test="error"]');
        this.errorMessgaeContainer = this.page.locator('.error-message-container');

    }
    //Methods 
    async login(username: string, password: string){

        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();

    }

    async enterUsername(username: string){

        await this.usernameField.fill(username);

    }

    async clearUsername(){
        await this.usernameField.clear();
    }

    async clearPassword(){
        await this.passwordField.clear();
    }

    async enterPassword(password: string){
        await this.passwordField.fill(password);

    }

    async clickLogin(){
        await this.loginButton.click(); 
    }

    async getErrorMessage(){
       return await this.errorMessage.innerText();
        
    }
 
}
