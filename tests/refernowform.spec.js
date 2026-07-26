import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ReferNowForm from '../pages/ReferNowForm';
import loginData from '../data/LoginData.json';
import referData from '../data/ReferData.json';

test.describe('Refer Offer form - field validation', () => {

    for (const data of referData) {
        test(`Type: ${data.type} - name: "${data.name}", number: "${data.number}", email: "${data.email}"`, async ({ page }) => {

            const login = new LoginPage(page);
            const referForm = new ReferNowForm(page);
            const user = loginData.find(acc => acc.username === 'reenabade');

            await login.open();
            await login.login(user.username, user.password);

            await referForm.openReferForm();
            await referForm.fillForm(data.name, data.number, data.email);
            await referForm.selectMapLocation();

            const isEnabled = await referForm.isSubmitEnabled();
            console.log(`[${data.type}] Submit enabled: ${isEnabled} (name: "${data.name}", number: "${data.number}", email: "${data.email}")`);
        });
    }
});