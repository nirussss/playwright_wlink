import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage'; 
import QuickLinks from '../pages/QuickLinks';
import loginData from '../data/loginData.json';

test.describe.configure({ mode: 'default' });

test.describe('Quick Links Navigation Tests', () => {
    let quickLinks;

    test.beforeEach(async ({ page }, testInfo) => {
        const login = new LoginPage(page);
        quickLinks = new QuickLinks(page);

        const validAccounts = loginData.filter(account => account.type === 'valid');
        const accountIndex = testInfo.workerIndex % validAccounts.length;
        const currentUser = validAccounts[accountIndex];

        await login.open();
        await page.waitForLoadState('domcontentloaded');
        await login.login(currentUser.username, currentUser.password);
        
        const progressAlert = page.getByText('Login is already in progress');
        let attempts = 0;
        while (await progressAlert.isVisible({ timeout: 2000 }).catch(() => false) && attempts < 3) {
            await page.getByRole('button', { name: 'Close' }).click();
            await page.waitForTimeout(2000); 
            await login.login(currentUser.username, currentUser.password);
            attempts++;
        }
         
        const quickLinksElement = page.locator('body').getByText('Quick Links');
        await expect(quickLinksElement.first()).toBeVisible({ timeout: 25000 });
    });

    test('TC-NAV-01: Verify NetTv link navigation', async ({ page }) => {
        const popupPromise = page.waitForEvent('popup');
        await quickLinks.clickCard('NetTv');
        const popup = await popupPromise;
        await expect(popup).toHaveURL("https://webtv.nettv.com.np/", { timeout: 15000 });
    });

    test('TC-NAV-02: Verify Viber Community popup navigation', async ({ page }) => {
        const popupPromise = page.waitForEvent('popup');
        await quickLinks.clickCard('Viber Community');
        const popup = await popupPromise;
        await expect(popup).toHaveURL(/viber/i, { timeout: 15000 });
    });

test('TC-NAV-03: Verify mobile app installation link navigation', async ({ page }) => {
        const appCard = page.locator('.MuiCard-root').getByText('MyWorldLink App', { exact: false });
        await appCard.scrollIntoViewIfNeeded();

        // 1. Setup the popup promise listener first
        const playStorePromise = page.waitForEvent('popup');
        
        // 2. Safely find and click the first SVG icon inside the targeted Card
        await appCard.locator('xpath=//ancestor::div[contains(@class, "MuiCard-root")]//svg').first().click();
        
        // 3. Resolve and assert the popup context
        const playStorePopup = await playStorePromise;
        await expect(playStorePopup).toHaveURL(/.*play\.google\.com.*/, { timeout: 15000 });
        await playStorePopup.close();
    });

 test('TC-NAV-04: Verify Payment Method link navigation', async ({ page }) => {
        // 1. Capture the new tab/popup window as soon as it spawns
        const popupPromise = page.waitForEvent('popup');

        await quickLinks.clickCard('Payment Method');

        const popup = await popupPromise;
        
        // 2. FIX: Wrap the locator inside the expect block, and check the 'popup' tab context
        await expect(popup.getByRole('heading', { name: 'Internet Payment', exact: true })).toBeVisible({ timeout: 15000 });

        // 3. Clean up the tab when finished
        await popup.close();
    });

    test('TC-NAV-05: Verify FAQs link navigation', async ({ page }) => {
        await page.waitForLoadState('domcontentloaded');
        const popupPromise = page.waitForEvent('popup').catch(() => null);
        await quickLinks.clickCard('FAQs');
        const popup = await popupPromise;

        if (popup) {
            await expect(popup).toHaveURL("https://worldlink.com.np/faqs/");
            await popup.close();
        } else {
            await expect(page).toHaveURL("https://worldlink.com.np/faqs/");
        }
    });

    test('TC-NAV-06: Verify Chat with Live Agent opens chat frame', async ({ page }) => {
        await quickLinks.clickCard('Chat with Live Agent');
        await expect(page.getByText('Chat With Us').first()).toBeVisible({ timeout: 10000 });
    });
});