import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';


test.beforeEach(async ({page}) => {

    const loginPage = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user','secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    
});

test('Add item to cart from inventory screen', async ({page}) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.productButtons.first().click();
    await expect(cartPage.cartProducts.first()).toHaveText('Sauce Labs Backpack');
    await expect(cartPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.productButtons.first()).toHaveText('Remove');
})

test('User can add item to the cart', async ({page}) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.productButtons.first().click();
    await cartPage.cartLink.click();
    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.title).toContainText('Your Cart');
    await expect(cartPage.cartProducts).toContainText('Sauce Labs Backpack')
    await expect(cartPage.cartQuantity).toContainText('1');
    await expect(cartPage.checkoutButton).toBeVisible();

});

test('Remove item so cart it empty and return to inventory screen', async ({page}) =>{

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.productButtons.first().click();
    await cartPage.cartLink.click();
    await expect(cartPage.cartProducts).toHaveText('Sauce Labs Backpack');
    await expect(cartPage.cartQuantity).toHaveText('1');
    await cartPage.removeItem.click();
    await expect(cartPage.cartBadge).toHaveCount(0);
    await cartPage.continueButton.click();
    await expect(page).toHaveURL(/inventory/);
});

test('Add multiple items to cart', async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await inventoryPage.productBackpack.click();
    await inventoryPage.productTshirt.click();
    await expect(cartPage.cartBadge).toHaveText('2');
    await cartPage.cartLink.click();
    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.cartProducts.first()).toHaveText('Sauce Labs Backpack');
 

});
