// pages/ReportForm.js
import { expect } from '@playwright/test';

class ReportForm {
  constructor(page) {
    this.page = page;
    this.supportLink = page.getByText('Support', { exact: true });
    this.reportProblemBtn = page.getByRole('button', { name: 'Report Problem' });
    this.modalHeading = page.getByRole('heading', { name: 'Report Trouble Ticket' });
    this.modal = page.locator('.MuiDialog-container, [role="dialog"]');
    this.problemTypeDropdown = this.modal.locator('[role="button"][aria-haspopup="listbox"]').nth(0);
    this.problemCategoryDropdown = this.modal.locator('[role="button"][aria-haspopup="listbox"]').nth(1);

    this.descriptionInput = page.locator('textarea[maxlength="300"]');

    this.fileInput = page.locator('#ticket-attachments');
    this.reportSubmitBtn = page.getByRole('button', { name: 'Report', exact: true });
  }

  async openReportModal() {
    await expect(this.supportLink).toBeVisible({ timeout: 15000 });
    await this.supportLink.click();

    await expect(this.reportProblemBtn).toBeVisible({ timeout: 15000 });
    await this.reportProblemBtn.click();

    await expect(this.modalHeading).toBeVisible({ timeout: 15000 });
  }

  async selectProblemType(typeName) {
    await expect(this.problemTypeDropdown).toBeVisible();
    await this.problemTypeDropdown.click();
    await this.page.getByRole('option', { name: typeName }).click();
  }

  async selectProblemCategory(categoryName) {
    await expect(this.problemCategoryDropdown).toBeVisible({ timeout: 10000 });
    await this.problemCategoryDropdown.click();
    await this.page.getByRole('option', { name: categoryName }).click();
  }

  async uploadAttachment(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }
}

export default ReportForm;