import { test, expect } from '@playwright/test';
import { TestSetup } from '../../testSetup';

let setUp : TestSetup

    test.beforeEach(async({page})=>{

        setUp  = new TestSetup(page);
        
       await setUp.toPage('https://www.saucedemo.com/');
    });


test('Login authenticated user', async ({page}) => {

    await setUp.loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

});

test('Invalid password login', async ({page})=>{

    await setUp.loginPage.login('standard_user', 'invalid_password');

    await expect(setUp.loginPage.errorMessageContainer).toBeVisible();
    await expect(setUp.loginPage.errorMessage).toBeVisible();
    await expect(setUp.loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    
});

test('Locked user details', async ({page})=>{

    await setUp.loginPage.login('locked_out_user', 'secret_sauce');

    await expect(setUp.loginPage.errorMessageContainer).toBeVisible();
    await expect(setUp.loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
});

test('Missing username', async ({page}) => {


    await setUp.loginPage.login('','secret_sauce');

    await expect(setUp.loginPage.errorMessage).toContainText('Epic sadface: Username is required');
    
});

test('Missing password', async ({page}) => {

    await setUp.loginPage.login('standard_user','');

    await expect(setUp.loginPage.errorMessage).toContainText('Epic sadface: Password is required');
})