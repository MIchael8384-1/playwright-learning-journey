import { test, expect } from '@playwright/test';
import { TestSetup } from '../../testSetup';


test.beforeEach(async ({page}) => {

    const testSetup = new TestSetup(page)

    await testSetup.prepareApplication('https://www.saucedemo.com/', 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    
});

test('Add item to cart from inventory screen', async ({page}) => {

    const setUp  = new TestSetup(page);

    await expect(setUp.inventoryPage.productName.first()).toHaveText('Sauce Labs Backpack');
    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(setUp.cartPage.cartBadge).toHaveText('1');
    await expect(setUp.inventoryPage.productButtons.first()).toHaveText('Remove');
})

test('User can add item to the cart', async ({page}) => {
    
    const setUp  = new TestSetup(page);

    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');
    await setUp.cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(setUp.cartPage.title).toContainText('Your Cart');
    await expect(setUp.inventoryPage.productName).toContainText('Sauce Labs Backpack')
    await expect(setUp.cartPage.cartQuantity).toContainText('1');
    await expect(setUp.cartPage.checkoutButton).toBeVisible();

});

test('Remove item so cart it empty and return to inventory screen', async ({page}) =>{

    const setUp  = new TestSetup(page);

    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');
    await setUp.cartPage.navigateToCart();

    await expect(setUp.cartPage.cartProducts).toHaveText('Sauce Labs Backpack');
    await expect(setUp.cartPage.cartQuantity).toHaveText('1');

    await setUp.cartPage.removeItem();

    await expect(setUp.cartPage.cartBadge).toHaveCount(0);

    await setUp.cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);
});

test('Add multiple items to cart', async ({page}) => {
    
    const setUp  = new TestSetup(page);

    await setUp.inventoryPage.addProductToCart('Sauce Labs Backpack');
    await setUp.inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await expect(setUp.cartPage.cartBadge).toHaveText('2');

    await setUp.cartPage.navigateToCart();

    await expect(page).toHaveURL(/cart/);
    await expect(setUp.cartPage.title).toBeVisible();
    await expect(setUp.cartPage.cartItems).toHaveCount(2);
    await expect(setUp.cartPage.cartProducts.first()).toHaveText('Sauce Labs Backpack');
 

});
