import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com/');
});


test('Login authenticated user', async ({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

});

test('Invalid password login', async ({page})=>{

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'invalid_password');


    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();

    await expect(page.getByRole('button', {name: 'Login'})).toBeDisabled();
});

test('Locked user details', async ({page})=>{

    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});

test('Missing username', async ({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.login('','secret_sauce');

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    
});

test('Missing password', async ({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user','');

    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
});