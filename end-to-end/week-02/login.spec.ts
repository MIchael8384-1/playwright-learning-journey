import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com/');
});

test('Login authenticated user', async ({page}) => {

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name : 'Login'}).click();

    await expect(page.locator('.app_logo')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
   
});

test('Invalid password login', async ({page})=>{

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('InvlaidPassword');

    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible;
});

test('Locked user details', async ({page})=>{
    
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.locator('.error-message-container')).toBeVisible();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
})

test('Missing username', async ({page}) => {

    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    
})

test('Missing password', async ({page}) => {

    await page.getByPlaceholder('Username').fill('Epic sadface: Password is required');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
})
