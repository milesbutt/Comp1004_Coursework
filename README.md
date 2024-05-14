#COMP1004: Databases and Interfaces Coursework
####Miles Butt (psymb18)

###Light House Test
![Screenshot of Lighthouse results](./lighthouse.jpg)
This Lighthouse 'Report' shows 100% perforamce and accesibility for my coursework website


###Additional Test
#####Test 1:
```
 test('null entries - vehicle', async ({ page }) => {
    await page.getByRole('link', { name: 'Vehicle search' }).click();
    await page.locator('#rego').fill('')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#message')).toContainText('Error')
 
 });
```
This test checks to see if submitting an empty/ null vehicle registration plate into the form will display an error message on page.


#####Test 2:
```
 test('null entries - person', async ({ page }) => {
    await page.getByRole('link', { name: 'People search' }).click();
    await page.locator('#name').fill('')
    await page.locator('#license').fill('')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#message')).toContainText('Error')
 
 });
```
Similar to the first test, this test checks if submitting a null/ empty name and license number will will display an error message on page.


#####Test 3:
```
 test('two entries at once', async ({ page }) => {
    await page.getByRole('link', { name: 'People search' }).click();
    await page.locator('#name').fill('MILES')
    await page.locator('#license').fill('MJ22914')
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#message')).toContainText('Error')
 
 });
```
This test checks that if 2 entries are entered into the form then it will cause an error message to be displayed onto the page.


#####Test 4:
```
 test('add a vehicle with existing owner information', async ({ page }) => {
    await page.getByRole('link', { name: 'Add a vehicle' }).click();
    await page.locator('#rego').fill('MJ05NPD');
    await page.locator('#make').fill('Ford');
    await page.locator('#model').fill('Fiesta');
    await page.locator('#colour').fill('Silver');
    await page.locator('#owner').fill('Rachel Smith')
    await page.getByRole('button', { name: 'Add vehicle' }).click();
    await expect(page.locator('#message')).toContainText('Vehicle added successfully')
 
 });
```
This test checks that adding a new vehicle with existing owner information on the "Add a vehicle" page will result in the vehicle being added and a additional confirmation message 'Vehicle added successfully' to be displayed on screen. 

#####Test 5:
```
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
```
This test varifies that the side bar, header, footer and main elements are on/within the page.
