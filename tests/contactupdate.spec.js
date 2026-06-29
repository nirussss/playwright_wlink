import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ContactUpdate from '../pages/ContactUpdate';

test('Verify primary email is displayed in Contact Update', async ({ page }) => {

  const login = new LoginPage(page);
  const contact = new ContactUpdate(page);

  await login.open();

  await login.login(
    'aakashduwal',
    'Duwals@77'
  );

  await expect(
    page.getByRole('link', { name: 'Services' })
  ).toBeVisible({timeout:20000});


  await contact.open();

  await contact.verifyEmailExists();

});