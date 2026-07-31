import { test, expect } from '@playwright/test';

test('Login', async ({page}) => {

    await page.goto('https://www.saucedemo.com/');
    
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('standard_user');

    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    
});


/*
Could I explain what test() does?
test() is used to set up a new test case

Could I write a simple test without looking at notes?
Yes - 
test('', aysnc ({page}) => {
await page.goto('');
await expect(page).toHaveURL('');
})

Can I find an element using getByRole()?
await page.getByRole('botton', {name: 'labs'}).click();

Can I run one test from VS Code?
yes

Can I read a Playwright error message?
yes
*/



test('Select Item and add to shopping cart', async ({page}) => {

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('standard_user');

    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveURL(/inventory/);
   
    await page.getByText('Sauce Labs Backpack').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');

    await page.getByRole('button', {name:'Add to cart'}).click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart/);

    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();



    
})
