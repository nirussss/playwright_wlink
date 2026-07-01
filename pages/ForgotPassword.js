import { expect } from '@playwright/test';

class ForgotPassword {
    constructor(page) {
        this.page = page;
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password ?' });
        this.recoverusernameInput = page.locator('input[name="username"]');
        this.emailRadioButton = this.page.getByRole('radio', { name: 'Email' });
        this.mobileRadioButton = this.page.getByRole('radio', { name: 'Mobile' });
        this.enterusernameErrorMessage = this.page.getByText('Please enter your username');
    }
 
    async open() {
        await this.page.goto('/eservice-login', { waitUntil: 'networkidle' });
    }

    async clickForgotPasswordLink(){
        await expect(this.forgotPasswordLink).toBeVisible();
        await this.forgotPasswordLink.click();
    }

    async verifyURL(){
        await expect(this.page).toHaveURL(/\/forgot_password/);
    }

    async fillusername(username){
        await expect(this.recoverusernameInput).toBeVisible();
        await this.recoverusernameInput.clear();
        await this.recoverusernameInput.fill(username);
    }

    async verifyNoUsernameError(){
        await expect(this.enterusernameErrorMessage).toBeVisible();
    }

    async selectOptionAndFillDetails(type, value) {
        if (type === 'email') {
            await this.emailRadioButton.click();
            const emailInput = this.page.locator('input[name="email"], input[type="email"]').first();
            await expect(emailInput).toBeVisible();
            await emailInput.fill(value);
        } else if (type === 'mobile') {
            await this.mobileRadioButton.click();
            const mobileInput = this.page.locator('input[name="mobile"], input[name="phone"], input[type="tel"]').first();
            await expect(mobileInput).toBeVisible();
            await mobileInput.fill(value);
        }
    }

    async clickSubmit() {
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async verifyMobileErrorMessageIsVisible() {
        await expect(this.page.getByText('Mobile Number is not avaiable.')).toBeVisible();
    }

    async verifyEmailErrorMessageIsVisible() {
        await expect(this.page.getByText('invalid')).toBeVisible();
    }
}
export default ForgotPassword;