import { test, expect } from '@playwright/test';

test.describe('Should complete the checkout flow', () => {

    test.beforeEach("Login", async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });

    test("Select Item and Checkout ", async ({ page }) => {
        //Get first product from product list
        let productElms = page.locator('.inventory_item');
        await expect(productElms).toHaveCount(6);
        let eleNode = productElms.nth(0);

        // Get and assert productName
        let productName = await eleNode.locator(".inventory_item_name").innerText();
        productName.match('Sauce Labs Backpack');

        // Finds and click <button> containing "Add to cart"
        await eleNode.getByRole('button', { name: 'Add to cart' }).click();

        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        //Enter and submit buyers data
        await page.locator('[data-test="firstName"]').fill('john');
        await page.locator('[data-test="lastName"]').fill('joe');
        await page.locator('[data-test="postalCode"]').fill('94804');
        await page.locator('[data-test="continue"]').click();

        //Confirm payment and shipping info
        await expect(page.locator('[data-test="payment-info-value"]')).toContainText('SauceCard #31337');
        await expect(page.locator('[data-test="shipping-info-value"]')).toContainText('Free Pony Express Delivery!');
        await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $29.99');
        await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $2.40');
        await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $32.39');
        await page.locator('[data-test="total-info-label"]').click();
        await page.locator('[data-test="payment-info-value"]').click();

        //Complete purchase
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
        await page.locator('[data-test="complete-header"]').click();






    });


});
