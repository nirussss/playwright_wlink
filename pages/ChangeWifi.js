import { expect } from '@playwright/test';

class ChangeWifi {

  constructor(page) {
    this.page = page;
    
    this.services = page.getByRole('link', { name: 'Services' })
    this.changeWifiBtn = page.getByRole('button', {
      name: 'Change WiFi Configuration'
    });

    this.togglePasswordVisibility = page.getByRole('button', {
      name: 'toggle password visibility'
    });

  }


  async openServices() {
    await expect(this.services).toBeVisible();
    await this.services.click();
  }


  async openChangeWifi() {

    await expect(this.changeWifiBtn).toBeVisible();
    await this.changeWifiBtn.click();

  }


  async showPassword() {

    await expect(this.togglePasswordVisibility).toBeVisible();
    await this.togglePasswordVisibility.click();

  }

}

export default ChangeWifi;