import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';

test('Login authenticated user', async ({setUp,page}) => {

    await setUp.loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

});

test('Invalid password login', async ({unauthenticatedSetUp})=>{

    await unauthenticatedSetUp.loginPage.login('standard_user', 'invalid_password');

    await expect(unauthenticatedSetUp.loginPage.errorMessageContainer).toBeVisible();
    await expect(unauthenticatedSetUp.loginPage.errorMessage).toBeVisible();
    await expect(unauthenticatedSetUp.loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    
});

test('Locked user details', async ({unauthenticatedSetUp})=>{

    await unauthenticatedSetUp.loginPage.login('locked_out_user', 'secret_sauce');

    await expect(unauthenticatedSetUp.loginPage.errorMessageContainer).toBeVisible();
    await expect(unauthenticatedSetUp.loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
});

test('Missing username', async ({unauthenticatedSetUp}) => {


    await unauthenticatedSetUp.loginPage.login('','secret_sauce');

    await expect(unauthenticatedSetUp.loginPage.errorMessage).toContainText('Epic sadface: Username is required');
    
});

test('Missing password', async ({unauthenticatedSetUp}) => {

    await unauthenticatedSetUp.loginPage.login('standard_user','');

    await expect(unauthenticatedSetUp.loginPage.errorMessage).toContainText('Epic sadface: Password is required');
})