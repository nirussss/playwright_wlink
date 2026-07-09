import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import Accounts from '../pages/Accounts';
import loginData from '../data/LoginData.json';

test.describe('Accounts Module - TCA-01 Cross-Browser Execution', () => {
    let login;
    let accountsPage;

  
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        accountsPage = new Accounts(page);
    });

    test('TCA-01: Verify user can view account invoices automatically on navigation', async ({ page }) => {
        const user = loginData.find(acc => acc.username === 'aakashduwal');
        await login.open();
        await login.login(user.username, user.password);
        await page.waitForURL('https://customer-portal.worldlink.com.np/', { timeout: 15000 });
        
        const apiPromise = page.waitForResponse(response => 
            response.url().includes('/all_transactions') && response.status() === 200,
            { timeout: 15000 }
        );
        await accountsPage.accountLink.click();
        await apiPromise;
        
        await expect(page.locator('body')).toContainText('Invoice No:');
        const invoiceLabel = page.locator('text=/Invoice No:\\s*\\d+/').first();
        await expect(invoiceLabel).toBeVisible();
    });

    test('TCA-02: Verify user can view online payment invoices when its selected', async ({ page }) => {
        const user = loginData.find(acc => acc.username === 'dipeshjungthapa');
        await login.open();
        await login.login(user.username, user.password);
        
        await page.waitForURL('https://customer-portal.worldlink.com.np/', { timeout: 15000 });
        
        const apiPromise = page.waitForResponse(response => 
            response.url().includes('/all_transactions') && response.status() === 200,
            { timeout: 15000 }
        );
        
        await accountsPage.accountLink.click();
        await page.waitForURL('**/account-services', { timeout: 15000 });
        const response = await apiPromise;
        const jsonBody = await response.json();
        const expectedOnlineData = jsonBody.response.online_payment; 
        await accountsPage.selectPaymentType('online');
    });
});