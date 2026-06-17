import { test, expect } from '@playwright/test';

test('valid login creds', async ({ page }) => {

  await page.goto('https://customer-portal.worldlink.com.np/eservice-login');

 
  await page.locator("input[name='username']").fill('aakashduwal');
  await page.locator("input[name='password']").fill('Duwals@77');

  // click login
  await page.getByRole('button', { name: 'Login' }).click();

  // wait for page to respond after login attempt
  await page.waitForTimeout(3000);


  await expect(page).toHaveURL(/eservice-login/);
});


test('login with incorrect creds', async ({ page }) => {

  await page.goto('https://customer-portal.worldlink.com.np/eservice-login');

  // fill wrong credentials
  await page.locator("input[name='username']").fill('incorrectuser');
  await page.locator("input[name='password']").fill('Password123');

  // click login
  await page.getByRole('button', { name: 'Login' }).click();

  // wait for response
  await page.waitForTimeout(3000);

  // ASSERTION (check error message if it appears)
  await expect(page.getByText(/invalid/i)).toBeVisible();

});