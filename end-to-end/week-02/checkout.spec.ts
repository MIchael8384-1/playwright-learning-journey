import { test, expect } from '@playwright/test';
import { TestSetup } from '../../testSetup';

var setUp: TestSetup;

test.beforeEach(async ({page}) => {
    
    setUp  = new TestSetup(page);

    await setUp.prepareApplication('https://www.saucedemo.com/', 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
})

test('User can complete checkout succesfully', async ({page}) =>{
    

    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');;
    await setUp.cartPage.navigateToCart();;
    await expect(page).toHaveURL(/cart/);

    await expect(setUp.cartPage.title).toBeVisible();
    await expect(setUp.cartPage.cartProducts).toBeVisible();
    await setUp.cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(setUp.checkoutPage.title).toHaveText('Checkout: Your Information');

    await setUp.checkoutPage.submitCheckoutInformation('Michael','Lynch','m31 7dr');
    await expect(page).toHaveURL(/checkout-step-two/);

    await expect(setUp.checkoutPage.title).toBeVisible();
    await expect(setUp.checkoutPage.checkoutProducts).toHaveText('Sauce Labs Backpack');
    await expect(setUp.checkoutPage.productInformation).toContainText('Payment Information:');
    await expect(setUp.checkoutPage.productInformation).toContainText('Shipping Information:');
    await expect(setUp.checkoutPage.productInformation).toContainText('Price Total');
    await expect(setUp.checkoutPage.finish).toBeVisible();

    await setUp.checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(setUp.checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(setUp.checkoutPage.checkoutComplete).toHaveText('Thank you for your order!');

    await setUp.checkoutPage.returnHome();
    await expect(page).toHaveURL(/inventory/);
    await expect(setUp.inventoryPage.cartBadge).toHaveCount(0)

});

test('First name is required', async ({page}) => {


    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');

    await setUp.cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(setUp.cartPage.title).toBeVisible();
    await expect(setUp.cartPage.cartProducts).toHaveText('Sauce Labs Backpack');

    await setUp.cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(setUp.checkoutPage.title).toHaveText('Checkout: Your Information');

    await setUp.checkoutPage.submitCheckoutInformation('','Test','M30');

    await expect(setUp.checkoutPage.errorMessage).toHaveText('Error: First Name is required')
});


test('Last name is required', async ({page}) => {

    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');;

    await setUp.cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(setUp.cartPage.title).toBeVisible();
    await expect(setUp.cartPage.cartProducts).toHaveText('Sauce Labs Backpack');

    await setUp.cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(setUp.checkoutPage.title).toHaveText('Checkout: Your Information');

    await setUp.checkoutPage.submitCheckoutInformation('Test','','M30');

    await expect(setUp.checkoutPage.errorMessage).toHaveText('Error: Last Name is required')
})

test('Zip/PostCode is required', async ({page}) => {


    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');

    await setUp.cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(setUp.cartPage.title).toBeVisible();
    await expect(setUp.cartPage.cartProducts).toHaveText('Sauce Labs Backpack');

    await setUp.cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(setUp.checkoutPage.title).toHaveText('Checkout: Your Information');

    await setUp.checkoutPage.submitCheckoutInformation('Test','Test','');

    await expect(setUp.checkoutPage.errorMessage).toHaveText('Error: Postal Code is required')
})


test('User cancels purchase', async ({page}) => {


    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');

    await setUp.cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(setUp.cartPage.title).toBeVisible();
    await expect(setUp.cartPage.cartProducts).toHaveText('Sauce Labs Backpack');

    await setUp.cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(setUp.checkoutPage.title).toHaveText('Checkout: Your Information');

    await setUp.checkoutPage.submitCheckoutInformation('Test','Test','M30');

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(setUp.checkoutPage.title).toHaveText('Checkout: Overview')
    
    await expect(setUp.checkoutPage.cancel).toBeVisible()

    await setUp.checkoutPage.cancelPurchase();

    await expect(page).toHaveURL(/inventory/);
})

