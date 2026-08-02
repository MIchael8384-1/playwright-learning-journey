
WEEK ONE

Review

What was easy?
I wouldnt say anything has been easy, but even though it has not been it been fun and interesting learning. 
What confused me?
Iniatlly how to set up the test was a little confusing, but I have tried my best to rememeber at least the set up of a test and assetion by memory. 
What did I Google?
Trying to understand which locator should be used and the importance for using getByRole().  


WEEK ONE COMPLETITON

Could I explain what test() does?
test() is used to set up a new test case

Could I write a simple test without looking at notes?

Yes - 
test('', aysnc ({page}) => {
await page.goto('');
await expect(page).toHaveURL('');
})

Can I find an element using getByRole()?
await page.getByRole('button', {name: 'labs'}).click();

Can I run one test from VS Code?
yes

Can I read a Playwright error message?
yes


Spent some time over the week organising my file structure to more replecate real world