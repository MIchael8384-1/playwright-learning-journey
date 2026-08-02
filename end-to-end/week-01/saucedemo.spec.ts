import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name : 'Login'}).click();

});

test('Login', async ({page}) => {
    
    await expect(page.locator('.app_logo')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
   
});




test('User can add product to shoping cart', async ({page}) => {


    await expect(page).toHaveURL(/inventory/);

    await page.getByText('Sauce Labs Backpack').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');

    await page.getByRole('button', {name:'Add to cart'}).click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart/);

    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    
})
