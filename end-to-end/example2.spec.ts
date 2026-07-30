import { test, expect } from '@playwright/test';


test('Login Tenant Configurator', async ({page}) => {
    await page.goto('https://gateway-dev.hostedservicepower.com/');
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill('test_admin_23@demo.com');
    await page.getByRole('textbox', {name: 'Password'}).click();
    await page.getByRole('textbox', {name: 'Password'}).fill('Password1!');
    await page.getByRole('button', { name: ' SIGN IN' }).click();

    await expect(page).toHaveURL('https://gateway-dev.hostedservicepower.com/');
   // await expect(page).toHaveURL('https://gateway-dev.hostedservicepower.com/tenant-list');
    await expect(page).toHaveTitle('Tenant Configurator');
    await expect(page.getByRole('heading', {name: 'Tenant'})).toBeVisible();

})


test('Search sch-int-dev Tenant', async ({page}) =>{
    await page.goto('https://gateway-dev.hostedservicepower.com/')
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill('test_admin_23@demo.com');
    await page.getByRole('textbox', {name: 'Password'}).click();
    await page.getByRole('textbox', {name: 'Password'}).fill('Password1!');
    await page.getByRole('button', {name: ' SIGN IN'}).click();

    await page.getByRole('textbox', {name: 'Search'}).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('sch-int-dev');
    await page.getByRole('textbox', { name: 'Search' }).press('Enter');
    await page.getByRole('cell', { name: 'ad2b2836-230c-449e-b9f8-' }).click();

    await expect(page).toHaveURL('https://gateway-dev.hostedservicepower.com/tenant-view/dVos1V49QKbiVd6oEXbcQv/entity')
    await expect(page.getByRole('heading', {name: 'Viewing tenant'})).toBeVisible();

});




//Review 
// What was easy?
// I wouldnt say anything has been easy, but even though it has not been it been fun and interesting learning. 
// What confused me?
// Iniatlly how to set up the test was a little confusing, but I have tried my best to rememeber at least the set up of a test and assetion by memory. 
// What did I Google?
// Trying to understand which locator should be used and the importance for using getByRole().  

