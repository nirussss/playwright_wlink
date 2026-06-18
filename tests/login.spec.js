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