import {test,expect} from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test('valid login creds', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.login("aakashduwal", "Duwals@77");

  // safer than URL check
  await expect(page.getByText('PERSONAL').isVisible());;
});


test('invalid login creds', async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();
  await login.login("wronguser", "wrongpass");

  await expect(page.getByText(/invalid/i)).toBeVisible();
});
