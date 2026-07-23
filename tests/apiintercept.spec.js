import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import Accounts from '../pages/Accounts';
import loginData from '../data/LoginData.json';

test('Inspect all_transactions API response', async ({ page }) => {

    const login = new LoginPage(page);
    const accountsPage = new Accounts(page);

    const user = loginData.find(
        acc => acc.username === 'dipeshjungthapa'
    );

    // 1. Attach API Listener BEFORE triggering actions
    page.on('response', async (response) => {
        if (response.url().includes('/all_transactions')) {
            console.log("----------------------------------------");
            console.log("API URL:", response.url());
            console.log("Status:", response.status());

            try {
                const body = await response.json();
                console.log("Response Body:", JSON.stringify(body, null, 2));
            } catch (err) {
                console.log("Could not parse JSON response:", err.message);
            }
            console.log("----------------------------------------");
        }
    });

    // 2. Perform Login Flow
    await login.open();
    await login.login(user.username, user.password);

    // 3. Confirm Home Navigation
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    // 4. Assert & Click Account (Now targeting <button> / MUI label)
    await expect(accountsPage.accountLink).toBeVisible({ timeout: 30000 });
    await accountsPage.accountLink.click();

    // 5. Short pause to let the listener log to terminal
    await page.waitForTimeout(3000); 
});