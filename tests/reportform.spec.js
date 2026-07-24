// tests/reportform.spec.js
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ReportForm from '../pages/ReportForm';
import path from 'path';

test.describe('Support Module - Report Trouble Ticket', () => {
  let loginPage;
  let reportPage;

  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    reportPage = new ReportForm(page);

    await loginPage.open();
    await loginPage.login('aakashduwal', 'Duwals@77');

    await reportPage.openReportModal();
  });

  test('TC-01: Verify Problem Categories appear after selecting Problem Type', async () => {
    await reportPage.selectProblemType('Slow Internet Connection Issue');
    await expect(reportPage.problemCategoryDropdown).toBeVisible();
    await reportPage.selectProblemCategory('Poor upload speed.');
  });

  test('TC-02: Fill ticket details and attach issue screenshot', async () => {
    const sampleImage = path.join(__dirname, '../data/m1.jpeg');

    await reportPage.selectProblemType('Slow Internet Connection Issue');
    await reportPage.selectProblemCategory('Poor upload speed.');
    await reportPage.descriptionInput.fill('Facing slow upload speeds for the last 2 hours.');
    await reportPage.uploadAttachment(sampleImage);

    await expect(reportPage.reportSubmitBtn).toBeEnabled();
  });

  test('TC-03: Change Problem Type and select a different Category', async () => {
    await reportPage.selectProblemType('Slow Internet Connection Issue');
    await reportPage.selectProblemCategory('Poor upload speed.');

    await reportPage.selectProblemType('NetTV Issue');
    await reportPage.selectProblemCategory('I want to subscribe NETTV');
  });
});