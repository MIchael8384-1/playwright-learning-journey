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