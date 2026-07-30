import { test, expect } from '@playwright/test';

//Every Test follows the same basic pattern
//Arrange -> Act -> Assert

//Learn this mindset 
// Prepare -> Perform -> Verify

//Every test start with test()
// test() creates one independent test case / page object represents browser tab 

test('has title', async ({page})=>{

//Navigate - almost every test begins here
//Will open the web page

//arrange 
await page.goto("https://playwright.dev/");
//assert
await expect(page).toHaveTitle(/Playwright/);
});

test('get link, async', async ({page})=>{

//arrange
await page.goto("https://playwright.dev/");

//Locator & Action 
//act
//console.log(await page.getByRole('textbox').allTextContents());
//await page.locator('input[formcontrolname="email"]').fill('test_admin_23@demo.com');
//await page.locator('input[formcontrolname="password"]').fill('Password1!');
await page.getByRole('link', { name: 'Get started' }).click();



//assert
//console.log(await page.getByRole('heading').allTextContents()); 
await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();


});


//Learn locator priority
//Memorise this order 
//1.getByRole()
//2.getByLabel()
//3.getByPlaceholder()
//4.getByTestId()

//test('Navigate to My Tenant', async ({page})=>{

//arrange
//await page.goto('https://gateway-dev.hostedservicepower.com/');

//Act
//await page.locator('input[formcontrolname="email"]').fill('test_admin_23@demo.com');
//await page.locator('input[formcontrolname="password"]').fill('Password1!');
//await page.getByRole('button', {name: "SIGN IN"}).click();
//await page.getByLabel();
//await page.getByPlaceholder();
//await page.getByTestId();

//Assert

//await expect(page).toHaveURL('/tenant-view/')
//await expect(page.getByRole("heading", {name: 'Viewing tenant'})).toBeVisible();

//})