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
     this.locationSearchInput = page.getByPlaceholder('Search For Location');
    this.searchResults = page.locator('.results.active div[data-key]');
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

 async searchLocation(query) {
    await this.locationSearchInput.click();
    await this.locationSearchInput.pressSequentially(query, { delay: 100 });
    await this.searchResults.first().waitFor({ state: 'visible', timeout: 8000 });
    await this.searchResults.first().click();
}

  async selectMapLocation() {
    await this.mapContainer.waitFor({ state: 'visible' });
    const box = await this.mapContainer.boundingBox(); //boundingBox() asks Playwright where exactly is the element positioned on the screen right now
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(this.locationErrorMsg).toBeHidden({ timeout: 5000 });
  }

  async isSubmitEnabled() {
    return await this.submitBtn.isEnabled();
  }
}

export default ReferNowForm;