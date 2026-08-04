import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page).toHaveURL(/inventory/);
    
});

test('Add item to cart from inventory screen', async ({page}) => {

    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    await page.locator('.btn_inventory').first().click();

    await expect(page.locator('[data-test=shopping-cart-badge]')).toHaveText('1');

    await expect(page.locator('.btn_inventory').first()).toHaveText('Remove');
})

test('User can add item to the cart', async ({page}) => {

    await page.locator('.btn_inventory').first().click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('.cart_quantity')).toHaveText('1');
    await expect(page.getByRole('button', {name : 'Checkout'})).toBeVisible();

})

test('Remove item so cart it empty and return to inventory screen', async ({page}) =>{

    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.getByRole('button', {name: 'Remove'}).click();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

    await page.getByRole('button', {name : 'Continue Shopping'}).click();

    await expect(page).toHaveURL(/inventory/);
})
