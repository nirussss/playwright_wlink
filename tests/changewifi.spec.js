import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ChangeWifi from '../pages/ChangeWifi';

test('login and change wifi flow', async ({ page }) => {

  const login = new LoginPage(page);
  const wifi = new ChangeWifi(page);

  const username = 'aakashduwal';
  const password = 'Duwals@77';

 
  await login.open();
  await login.login(username, password);

  await page.waitForLoadState('networkidle');





  await wifi.openServices();

  await wifi.openChangeWifi();

  await wifi.showPassword();
});