import { test, expect } from '@playwright/test';
import { TestSetup } from '../../testSetup';

var setUp : TestSetup

    test.beforeEach(async({page})=>{

        setUp  = new TestSetup(page);
        
        setUp.toPage('https://www.saucedemo.com/');
    });


test('Login authenticated user', async ({page}) => {
    
    await setUp.loginPage.enterUsername('standard_user');
    await setUp.loginPage.enterPassword('secret_sauce');
    await setUp.loginPage.clickLogin();

    await expect(page).toHaveURL(/inventory/);

});

test('Invalid password login', async ({page})=>{


    await setUp.loginPage.enterUsername('standard_user');
    await setUp.loginPage.enterPassword('invalid_password');
    await setUp.loginPage.clickLogin();


    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(setUp.loginPage.errorMessage).toBeVisible();
    await expect(setUp.loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    
});

test('Locked user details', async ({page})=>{

    await setUp.loginPage.login('locked_out_user', 'secret_sauce');

    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});

test('Missing username', async ({page}) => {


    await setUp.loginPage.login('','secret_sauce');

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    
});

test('Missing password', async ({page}) => {

    await setUp.loginPage.login('standard_user','');

    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
});