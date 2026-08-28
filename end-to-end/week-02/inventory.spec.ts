import { test, expect } from '@playwright/test';
import { TestSetup } from '../../testSetup';

let setUp : TestSetup;

test.beforeEach(async ({page})=>{

    setUp  = new TestSetup(page);
 
    await setUp.prepareApplication('https://www.saucedemo.com/', 'standard_user', 'secret_sauce');

})

test('User can view the inventory Page', async ({page}) => {

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});

test('Inventory dispalys product information', async ({page}) => {

    await expect(setUp.inventoryPage.productItems).toHaveCount(6);
    await expect(setUp.inventoryPage.productName.first()).toContainText('Sauce Labs Backpack');
    await expect(setUp.inventoryPage.productPrice.first()).toContainText('$29.99');
   
});

test('User can sort products by name descending', async ({page})=>{


    await expect(setUp.inventoryPage.productName).toHaveCount(6);
    await expect(setUp.inventoryPage.productPrice).toHaveCount(6);
    await expect(setUp.inventoryPage.productButtons).toHaveCount(6);

    await expect(setUp.inventoryPage.productName.first()).toHaveText('Sauce Labs Backpack');

    await expect(setUp.inventoryPage.sortOption).toHaveText('Name (A to Z)');
    await setUp.inventoryPage.sortProducts('za');
    await expect(setUp.inventoryPage.productName.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');

})