import exp from 'constants';

// @ts-check
const { test, expect} = require('@playwright/test');


// change this to the URL of your website, could be local or GitHub pages
const websiteURL = 'http://127.0.0.1:5500/people-search.html';

// Go to the website home page before each test.
test.beforeEach(async ({ page }) => {
   await page.goto(websiteURL);
});

test('test for header, footer, main and sidebar', async ({ page }) => {
    const header = await page.locator('header').count();
    const main = await page.locator('main').count();
    const sidebar = await page.locator('aside').count();
    const footer = await page.locator('footer').count();
 
    expect(header).toBeGreaterThan(0);
    expect(main).toBeGreaterThan(0);
    expect(sidebar).toBeGreaterThan(0);
    expect(footer).toBeGreaterThan(0);
 });
 
 test('add a vehicle with owner information', async ({ page }) => {
    await page.getByRole('link', { name: 'Add a vehicle' }).click();
    await page.locator('#rego').fill('MJ05NPD');
    await page.locator('#make').fill('Ford');
    await page.locator('#model').fill('Fiesta');
    await page.locator('#colour').fill('Silver');
    await page.locator('#owner').fill('Rachel Smith')
    await page.getByRole('button', { name: 'Add vehicle' }).click();
    await expect(page.locator('#message')).toContainText('Vehicle added successfully')
 
 });
 
 test('two entries at once', async ({ page }) => {
    await page.getByRole('link', { name: 'People search' }).click();
    await page.locator('#name').fill('MILES')
    await page.locator('#license').fill('MJ22914')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#message')).toContainText('Error')
 
 });
 
 test('null entries - person', async ({ page }) => {
    await page.getByRole('link', { name: 'People search' }).click();
    await page.locator('#name').fill('')
    await page.locator('#license').fill('')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#message')).toContainText('Error')
 
 });
 
 test('null entries - vehicle', async ({ page }) => {
    await page.getByRole('link', { name: 'Vehicle search' }).click();
    await page.locator('#rego').fill('')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#message')).toContainText('Error')
 
 });