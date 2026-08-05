import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page).toHaveURL(/inventory/);
})

test('User can complete checkout succesfully', async ({page}) =>{

    await page.locator('.btn_inventory').first().click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', {name : 'Checkout'}).click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    await page.getByPlaceholder('First Name').fill('Michael');
    await page.getByPlaceholder('Last Name').fill('Lynch');
    await page.getByPlaceholder('Zip/Postal Code').fill('m31 7dr');
    await page.getByRole('button', {name: 'Continue'}).click();

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Payment Information:')).toBeVisible();
    await expect(page.getByText('Shipping Information:')).toBeVisible();
    await expect(page.getByText('Price Total')).toBeVisible();
    await expect(page.getByRole('button', {name : 'Finish'})).toBeVisible();

    await page.getByRole('button', {name : 'Finish'}).click();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.getByText('Checkout: Complete!')).toBeVisible();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();

    await page.getByRole('button', {name: 'Back Home'}).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0)

});

test('First name is required', async ({page}) => {

    await page.locator('.btn_inventory').first().click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', {name : 'Checkout'}).click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    await page.getByPlaceholder('First Name').fill('');
    await page.getByPlaceholder('Last Name').fill('Test');
    await page.getByPlaceholder('Zip/Postal Code').fill('M30');
    await page.getByRole('button', {name: 'Continue'}).click();

    await expect(page.getByText('Error: First Name is required')).toBeVisible();
});


test('Last name is required', async ({page}) => {
    await page.locator('.btn_inventory').first().click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', {name : 'Checkout'}).click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('');
    await page.getByPlaceholder('Zip/Postal Code').fill('M30');
    await page.getByRole('button', {name: 'Continue'}).click();

    await expect(page.getByText('Error: Last Name is required')).toBeVisible();

})

test('Zip/PostCode is required', async ({page}) => {
    
    await page.locator('.btn_inventory').first().click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', {name : 'Checkout'}).click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('Test');
    await page.getByPlaceholder('Zip/Postal Code').fill('');
    await page.getByRole('button', {name: 'Continue'}).click();

    await expect(page.getByText('Error: Postal Code is required')).toBeVisible();
})


test('User cancels purchase', async ({page}) => {

    await page.locator('.btn_inventory').first().click();

    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', {name : 'Checkout'}).click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    await page.getByPlaceholder('First Name').fill('Michael');
    await page.getByPlaceholder('Last Name').fill('Lynch');
    await page.getByPlaceholder('Zip/Postal Code').fill('m31 7dr');
    await page.getByRole('button', {name: 'Continue'}).click();

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByRole('button', {name : 'Cancel'})).toBeVisible()

    await page.getByRole('button', {name : 'Cancel'}).click();

    await expect(page).toHaveURL(/inventory/);
})

