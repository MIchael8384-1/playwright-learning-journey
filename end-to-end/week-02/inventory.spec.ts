import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
    
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page).toHaveURL(/inventory/);

})

test('User can view the inventory Page', async ({page}) => {

    await expect(page.getByText('Products')).toBeVisible();
})

test('Inventory dispalys product information', async ({page}) => {

    await expect(page.locator('.inventory_item')).toHaveCount(6);

    //Item Name
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    //Item Button
    await expect(page.getByText('$29.99')).toBeVisible();
   
});

test('User can sort products by name descending', async ({page})=>{

    //Name
    await expect(page.locator('.inventory_item_name')).toHaveCount(6);
    //Price
    await expect(page.locator('.inventory_item_price')).toHaveCount(6);
    //Cart
    await expect(page.locator('.btn_inventory')).toHaveCount(6);

/*
Debugging 

    const productNames = await page.locator('.inventory_item_name');
    console.log(productNames);

    const firstProduct = productNames.first();
    console.log(firstProduct);

    const product = await firstProduct.innerText();
    console.log(product);
*/
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');

    await expect(page.locator('.active_option')).toHaveText('Name (A to Z)');
    await page.locator('.product_sort_container').selectOption('za');
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');

})