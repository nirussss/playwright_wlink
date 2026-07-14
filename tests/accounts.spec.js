import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import Accounts from '../pages/Accounts';
import loginData from '../data/LoginData.json';

test.describe('Accounts Module ', () => {
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
        await page.waitForURL('/eservice-login', { timeout: 15000 });
        
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
    await page.route('**/*.{png,jpg,jpeg,svg,webp}', route => route.abort());
    await login.open();
    await login.login(user.username, user.password);
    await page.waitForURL('/eservice-login', { timeout: 15000 });
    
    await accountsPage.accountLink.click();
    await page.waitForURL('**/account-services', { timeout: 15000 });
    await accountsPage.selectPaymentType('online');
    await expect(page.locator('body')).toContainText('Invoice No:');
});

   test('TCA-03: Check if "make a payment" is clickable and redirects', async ({ page }) => {
        const user = loginData.find(acc => acc.username === 'dipeshjungthapa');
        await login.open();
        await login.login(user.username, user.password);
        await expect(page.getByRole('link', { name: 'Account' })).toBeVisible({ timeout: 20000 });
        const apiPromise = page.waitForResponse(response => 
            response.url().includes('/all_transactions') && response.status() === 200,
            { timeout: 15000 }
        );
        
        await page.getByRole('link', { name: 'Account' }).click();
        await page.waitForURL('**/account-services', { timeout: 15000 });
        await apiPromise; // Ensure backend data is completely downloaded
        
        const [paymentPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('button', { name: 'Make Payment' }).click()
        ]);
        
        const expectedURL = 'https://epayment.worldlink.com.np/new/internet-payment?gateway=khalti&username=dipeshjungthapa';
        await paymentPage.waitForURL('**/new/internet-payment*', { waitUntil: 'commit', timeout: 15000 });
        expect(paymentPage.url()).toBe(expectedURL);
    });
})