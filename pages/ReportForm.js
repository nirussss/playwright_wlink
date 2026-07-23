// pages/ReportForm.js
import { expect } from '@playwright/test';

class ReportForm {
  constructor(page) {
    this.page = page;

    // Navigation & Modal triggers
    this.supportLink = page.getByText('Support', { exact: true });
    this.reportProblemBtn = page.getByRole('button', { name: 'Report Problem' });
    this.modalHeading = page.getByRole('heading', { name: 'Report Trouble Ticket' });

    // Dynamic Dropdowns
    // MUI dropdowns: 1st is Problem Type, 2nd is Problem Category
    this.problemTypeDropdown = page.getByRole('combobox').first().or(page.getByRole('button').nth(1));
    this.problemCategoryDropdown = page.getByRole('combobox').nth(1).or(page.getByRole('button').nth(2));

    // Form Fields
    this.descriptionInput = page.getByRole('textbox');
    this.fileInput = page.locator('#ticket-attachments');
    
    // Action Buttons
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