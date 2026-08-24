import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.beforeEach(async ({page}) => {

    const loginPage = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user','secret_sauce');
    await expect(page).toHaveURL(/inventory/);
})

test('User can complete checkout succesfully', async ({page}) =>{

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');;
    await cartPage.navigateToCart();;
    await expect(page).toHaveURL(/cart/);

    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.cartProducts).toBeVisible();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

    await checkoutPage.submitCheckoutInformation('Michael','Lynch','m31 7dr');
    await expect(page).toHaveURL(/checkout-step-two/);

    await expect(checkoutPage.title).toBeVisible();
    await expect(checkoutPage.checkoutProducts).toHaveText('Sauce Labs Backpack');
    await expect(checkoutPage.productInformation).toContainText('Payment Information:');
    await expect(checkoutPage.productInformation).toContainText('Shipping Information:');
    await expect(checkoutPage.productInformation).toContainText('Price Total');
    await expect(checkoutPage.finish).toBeVisible();

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.checkoutComplete).toHaveText('Thank you for your order!');

    await checkoutPage.returnHome();
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.cartBadge).toHaveCount(0)

});

test('First name is required', async ({page}) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.cartProducts).toHaveText('Sauce Labs Backpack');

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

    await checkoutPage.submitCheckoutInformation('','Test','M30');

    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required')
});


test('Last name is required', async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page)

    await inventoryPage.addProductToCart('Sauce Labs Backpack');;

    await cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.cartProducts).toHaveText('Sauce Labs Backpack');

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

    await checkoutPage.submitCheckoutInformation('Test','','M30');

    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required')
})

test('Zip/PostCode is required', async ({page}) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page)

    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.cartProducts).toHaveText('Sauce Labs Backpack');

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

    await checkoutPage.submitCheckoutInformation('Test','Test','');

    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required')
})


test('User cancels purchase', async ({page}) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page)

    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.cartProducts).toHaveText('Sauce Labs Backpack');

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

    await checkoutPage.submitCheckoutInformation('Test','Test','M30');

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.title).toHaveText('Checkout: Overview')
    
    await expect(checkoutPage.cancel).toBeVisible()

    await checkoutPage.cancelPurchase();

    await expect(page).toHaveURL(/inventory/);
})

