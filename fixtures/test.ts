import { test as basetest } from "@playwright/test";
import { TestSetup } from "../testSetup";;

const test = basetest.extend<{setUp: any;}>({

    setUp: async ({ page }, use) => {
        
        const setUp = new TestSetup(page);

        await setUp.prepareApplication('https://www.saucedemo.com/','standard_user','secret_sauce');

        await use(setUp);
    }

});

export {test};