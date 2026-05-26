import { test, expect } from "@playwright/test";

test("Successfully Book an Appointment", async ({ page }) => {

    //Navigate to the homepage
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service")
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.locator('#login')).toContainText('Please login to make appointment.');

    //Login
    await page.getByLabel('Username').fill('John Doe');
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();

    //Book an appointment 
    await page.getByLabel('Facility').selectOption('Seoul CURA Healthcare Center');
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
    await page.getByRole('radio', { name: 'Medicare' }).check();
    await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
    await page.getByRole('cell', { name: '28' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Escape');
    await page.getByRole('textbox', { name: 'Comment' }).fill('Codegen');
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();

    //Confirm appointment
    await expect(page.locator('h2')).toContainText('Appointment Confirmation');
    await expect(page.locator('#summary')).toContainText('Please be informed that your appointment has been booked as following:');
    await expect(page.locator('#facility')).toContainText('Tokyo CURA Healthcare Center');
    await expect(page.locator('#hospital_readmission')).toContainText('Yes');
    await expect(page.locator('#program')).toContainText('Medicare');
    await expect(page.locator('#visit_date')).toContainText('28/05/2026');
    await expect(page.locator('#comment')).toContainText('Codegen');
});
