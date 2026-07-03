import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import loginData from "../data/loginData.json";

for (const data of loginData) {

  test(`login test for ${data.username}`, async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login(data.username, data.password);

    if (data.type === 'valid') {
      await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    } else if (data.type === 'invalid') {
      await expect(page.getByText(/invalid/i)).toBeVisible();
    } else {
      await expect(page.getByText(/missing/i)).toBeVisible();
    }
  });
}

test('Direct login navigation test', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.directLogin();
  await expect(page).toHaveURL(/\/direct_login/);
});

test('Google login navigation test', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  
  const popupPromise = page.waitForEvent('popup');
  await login.loginWithGoogle(); 
  const popup = await popupPromise;
  
  await popup.waitForLoadState('domcontentloaded');
  await expect(popup.locator('body')).toContainText(/Sign in with Google|Email or phone/i);
});