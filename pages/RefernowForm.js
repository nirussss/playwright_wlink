import { expect } from '@playwright/test';

class ReferNowForm {
  constructor(page) {
    this.page = page;

    this.referOfferLink = page.getByRole('link', { name: 'Refer Offer' });
    this.referNowBtn = page.getByRole('button', { name: 'Refer Now' });

    this.nameInput = page.locator('input[name="fname"]');
    this.numberInput = page.locator('input[name="fnumber"]');
    this.emailInput = page.locator('input[name="email"]');

    this.mapContainer = page.locator('.leaflet-container');
    this.locationErrorMsg = page.getByText('You have to select the location to refer successfully');
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.closeBtn = page.getByRole('button', { name: 'close' });
  }

  async openReferForm() {
    await this.referOfferLink.click();
    await expect(this.referNowBtn).toBeVisible({ timeout: 15000 });
    await this.referNowBtn.click();
  }

  async fillForm(name, number, email) {
    await this.nameInput.fill(name);
    await this.numberInput.fill(number);
    await this.emailInput.fill(email);
  }

  async selectMapLocation() {
    await this.mapContainer.waitFor({ state: 'visible' });
    const box = await this.mapContainer.boundingBox();
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

    
    await expect(this.locationErrorMsg).toBeHidden({ timeout: 5000 });
  }

  async isSubmitEnabled() {
    return await this.submitBtn.isEnabled();
  }
}

export default ReferNowForm;