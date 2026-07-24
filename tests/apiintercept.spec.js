// tests/api-intercept.spec.js
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import Accounts from '../pages/Accounts';
import loginData from '../data/LoginData.json';

test('Intercept and mock all_transactions API response', async ({ page }) => {

    const login = new LoginPage(page);
    const accountsPage = new Accounts(page);
    const user = loginData.find(acc => acc.username === 'dipeshjungthapa');

    // Intercept the request
    await page.route('**/*all_transactions*', async (route) => {

        // Let the real request go out and capture the real response
        const response = await route.fetch();
        const originalBody = await response.json();

        console.log("===== ORIGINAL API RESPONSE =====");
        console.log(JSON.stringify(originalBody, null, 2));

        const mockedBody = {
            code: 200,
            error: false,
            response: {
                account_payment: [
                     {
        "date": "2023-12-28",
        "particular": "Advance Payment",
        "debit": 0,
        "credit": "1",
        "invoice_no": "TEST07",
        "remarks": "niru",
        "operator": "fonepay",
        "bill_number": "ab567"
      }
                ],
                online_payment: []
            }
        };

        console.log("===== MOCKED API RESPONSE =====");
        console.log(JSON.stringify(mockedBody, null, 2));

//Send the mocked response 
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockedBody)
        });
    });
    await login.open();
    await login.login(user.username, user.password);

    await expect(accountsPage.accountLink).toBeVisible({ timeout: 20000 });
    await accountsPage.accountLink.click();

    await expect(page.locator('body')).toContainText('7');
});