import { test, expect } from '@playwright/test';
import ForgotPassword from '../pages/ForgotPassword';
import forgotPasswordData from '../data/forgotPasswordData.json';

for (const data of forgotPasswordData) {

    test(`Forgot Password - ${data.scenario}`, async ({ page }) => {
        const forgotPasswordPage = new ForgotPassword(page);
        
        await forgotPasswordPage.open();
        await forgotPasswordPage.clickForgotPasswordLink();
        await forgotPasswordPage.verifyURL();
        
        if (data.username === "") {
            await forgotPasswordPage.clickSubmit(); 
            await forgotPasswordPage.verifyNoUsernameError();
            return;
        } else {
            await forgotPasswordPage.fillusername(data.username);
        }
        
        const contactValue = data.sendCodeVia === 'email' ? data.email : data.phone;
        
        await forgotPasswordPage.selectOptionAndFillDetails(data.sendCodeVia, contactValue);
        
        await forgotPasswordPage.clickSubmit();
        
        if (data.sendCodeVia === 'email') {
            await forgotPasswordPage.verifyEmailErrorMessageIsVisible();
        } else {
            await forgotPasswordPage.verifyMobileErrorMessageIsVisible();
        }
    });
}