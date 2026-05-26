import { test, expect } from "@playwright/test";

test("Should load homepage with correct title", async ({ page }) => {

    //1. Go to the homepage
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    //2. Assert if the title is correct 
    await expect(page).toHaveTitle("CURA Healthcare Service")

    //3. Assert header text
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")

    //4. Click make appointment
    await page.getByRole('link', { name: 'Make Appointment' }).click();

    //5. Login
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.locator('#login')).toContainText('Please login to make appointment.');
    await page.getByLabel('Username').fill('John Doe');
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    //6. Book an appointment 
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
    await page.getByRole('radio', { name: 'Medicare' }).check();
    await page.getByRole('textbox', { name: 'Comment' }).fill('Codegen');
    await page.getByRole('button', { name: 'Book Appointment' }).click();

    //7. Confirm appointment
    await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
    await expect(page.locator('#summary')).toContainText('Please be informed that your appointment has been booked as following:');
    await expect(page.locator('#facility')).toContainText('Tokyo CURA Healthcare Center');
    await expect(page.locator('#hospital_readmission')).toContainText('Yes');
    await expect(page.locator('#program')).toContainText('Medicare');
    await expect(page.locator('#visit_date')).toContainText('27/05/2026');
    await expect(page.locator('#comment')).toContainText('Codegen');
});