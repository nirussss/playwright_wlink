import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("input[name='username']");
    this.password = page.locator("input[name='password']");
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto(
      'https://customer-portal.worldlink.com.np/eservice-login',
      {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
      }
    );
  }

  async login(user, pass) {

    await expect(this.username).toBeVisible();
    await this.username.fill(user);

    await expect(this.password).toBeVisible();
    await expect(this.password).toBeEnabled();
    await this.password.fill(pass);

    await expect(this.loginBtn).toBeEnabled();
    await this.loginBtn.click();
  }
}

export default LoginPage;