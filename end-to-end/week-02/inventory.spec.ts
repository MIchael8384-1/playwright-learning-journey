import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage'; 
import { InventoryPage } from '../../pages/InventoryPage';

test.beforeEach(async ({page})=>{

    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user','secret_sauce')

})

test('User can view the inventory Page', async ({page}) => {

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});

test('Inventory dispalys product information', async ({page}) => {

    const inventoryPage = new InventoryPage(page);

    await expect(inventoryPage.productItems).toHaveCount(6);

    //Item Name
    await expect(inventoryPage.productName.first()).toContainText('Sauce Labs Backpack');
    //Item Button
    await expect(inventoryPage.productPrice.first()).toContainText('$29.99');
   
});

test('User can sort products by name descending', async ({page})=>{

    const inventoryPage = new InventoryPage(page);
    //Name
    await expect(inventoryPage.productName).toHaveCount(6);
    //Price
    await expect(inventoryPage.productPrice).toHaveCount(6);
    //Cart
    await expect(inventoryPage.productButtons).toHaveCount(6);

/*
Debugging 

    const productNames = await page.locator('.inventory_item_name');
    console.log(productNames);

    const firstProduct = productNames.first();
    console.log(firstProduct);

    const product = await firstProduct.innerText();
    console.log(product);
*/
    await expect(inventoryPage.productName.first()).toHaveText('Sauce Labs Backpack');

    await expect(inventoryPage.sortOption).toHaveText('Name (A to Z)');
    await inventoryPage.sortProducts('za');
    await expect(inventoryPage.productName.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');

})