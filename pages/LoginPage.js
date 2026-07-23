import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("input[name='username']");
    this.password = page.locator("input[name='password']");
    this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });
    this.directLoginBtn = page.locator('[role="button"][href="/direct_login"]');
    this.googleLoginBtn = page.getByRole('button', { name: 'Login with Google' });
    this.passwordtoggleicon=page.getByRole('button', { name: 'toggle password visibility' });
  }

  // async open() {
  //   await this.page.goto('/eservice-login');
  // }

  // async login(user, pass) {
  //   await expect(this.username).toBeVisible();
  //   await this.username.fill(user);

  //   await expect(this.password).toBeVisible();
  //   await expect(this.password).toBeEnabled();
  //   await this.password.fill(pass);

  //   await expect(this.loginBtn).toBeEnabled();
  //   await this.loginBtn.click();
  // }
  async open() {
  await this.page.goto('/eservice-login');
  await this.page.waitForLoadState('networkidle'); // let hydration/JS settle
}

async login(user, pass) {
  await expect(this.username).toBeVisible();

  // Fill + verify + auto-retry if hydration wipes the value
  await expect(async () => {
    await this.username.fill(user);
    await expect(this.username).toHaveValue(user);
  }).toPass({ timeout: 10000 });

  await expect(this.password).toBeVisible();
  await expect(async () => {
    await this.password.fill(pass);
    await expect(this.password).toHaveValue(pass);
  }).toPass({ timeout: 10000 });

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

  async togglePasswordVisibility() {
    await expect(this.passwordtoggleicon).toBeVisible();
    await this.passwordtoggleicon.click();
  }
}

export default LoginPage;