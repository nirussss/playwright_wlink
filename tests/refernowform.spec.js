import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ReferNowForm from '../pages/ReferNowForm';
import loginData from '../data/LoginData.json';

test.describe('Refer Offer - location search', () => {

    test('Valid location search selects location and enables submit', async ({ page }) => {
        const login = new LoginPage(page);
        const referForm = new ReferNowForm(page);
        const user = loginData.find(acc => acc.username === 'reenabade');

        await login.open();
        await login.login(user.username, user.password);

        await referForm.openReferForm();
        await referForm.fillForm('Test User', '9812345645', 'test@gmail.com');

        await referForm.searchLocation('nagadesh');
        await expect(referForm.locationErrorMsg).toBeHidden();
        const isEnabled = await referForm.isSubmitEnabled();
        console.log(`Submit enabled after valid location search: ${isEnabled}`);
        expect(isEnabled).toBe(true);
    });
    test('Invalid location search shows no results and submit stays disabled', async ({ page }) => {
        const login = new LoginPage(page);
        const referForm = new ReferNowForm(page);
        const user = loginData.find(acc => acc.username === 'reenabade');

        await login.open();
        await login.login(user.username, user.password);

        await referForm.openReferForm();
        await referForm.fillForm('Test User', '9812345645', 'test@gmail.com');

        await referForm.locationSearchInput.fill('4514545');

        // Confirm no suggestions appear for garbage input
        await expect(referForm.searchResults).toHaveCount(0, { timeout: 5000 });
        const isEnabled = await referForm.isSubmitEnabled();
        console.log(`Submit enabled after invalid location search: ${isEnabled}`);
        expect(isEnabled).toBe(false);
    });
});