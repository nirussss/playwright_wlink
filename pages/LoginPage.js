import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("input[name='username']");
    this.password = page.locator("input[name='password']");
    this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });
    this.directLoginBtn = page.locator('[role="button"][href="/direct_login"]');
    this.googleLoginBtn = page.getByRole('button', { name: 'Login with Google' });
  }

  async open() {
    await this.page.goto('/eservice-login');
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

  async directLogin() {
    await expect(this.directLoginBtn).toBeVisible();
    await this.directLoginBtn.click();
  }

  async loginWithGoogle() {
    await expect(this.googleLoginBtn).toBeVisible();
    await this.googleLoginBtn.click();
  }
}

export default LoginPage;