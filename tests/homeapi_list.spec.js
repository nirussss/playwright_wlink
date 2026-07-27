import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import loginData from '../data/LoginData.json';

test('Check which API/GET requests succeed or fail on homepage load', async ({ page }) => {

    const login = new LoginPage(page);
    const user = loginData.find(acc => acc.username === 'aakashduwal');

    const successful = [];
    const failed = [];

    page.on('response', (response) => {
        const url = response.url();
        const status = response.status();

        if (status >= 200 && status < 400) {
            successful.push({ url, status });
        } else {
            failed.push({ url, status });
        }
    });

    await login.open();
    await login.login(user.username, user.password);

await expect(page.getByRole('heading', { name: /Latest Ticket/ })).toBeVisible({ timeout: 20000 });
    await page.waitForTimeout(5000);

    console.log("===== SUCCESSFUL REQUESTS =====");
    successful.forEach(r => console.log(`[${r.status}] ${r.url}`));

    console.log("===== FAILED REQUESTS =====");
    if (failed.length === 0) {
        console.log("None — everything succeeded.");
    } else {
        failed.forEach(r => console.log(`[${r.status}] ${r.url}`));
    }
});
