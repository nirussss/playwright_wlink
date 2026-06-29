import {test, expect} from '@playwright/test';
    
class ContactUpdate {
    constructor(page) {
        this.page=page;
        this. services=page.getByRole('link', { name: 'Services' });
        this.contactupdate=page.getByRole('tab', { name: 'Contact Update' });
        this.primaryemailinput=page.locator('input[name="email_primary"]');

    }

    async open(){
        await expect(this.services).toBeVisible();
        await this.services.click();
        await expect(this.contactupdate).toBeVisible();

        await this.contactupdate.click();

    }
     async verifyEmailExists() {
    await expect(this.primaryemailinput).toBeVisible();
    await expect(this.primaryemailinput).not.toHaveValue('');
     }
    

}
export default ContactUpdate;