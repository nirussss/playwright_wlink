import { expect } from '@playwright/test';

class Accounts {
    constructor(page) {
        this.page = page;
        this.accountLink = page.getByRole('link', { name: 'Account' });
        this.dropdownSelectBox = page.locator('.MuiSelect-select');
        this.onlinePaymentOption = page.getByRole('option', { name: 'Online Payment' });
        this.accountPaymentOption = page.getByRole('option', { name: 'Account Payment' });
        this.makePaymentBtn = page.getByRole('button', { name: 'Make Payment', exact: false });
    }

    /**
     * Reusable action to switch dropdown filters cleanly
     * @param {'online' | 'account'} type 
     */
    async selectPaymentType(type) {
        await this.dropdownSelectBox.click();
        if (type === 'online') {
            await this.onlinePaymentOption.click();
        } else if (type === 'account') {
            await this.accountPaymentOption.click();
        }
    }

    /**
     * Dynamic action to click an invoice button based on its reference number
     * @param {string|number} invoiceNo 
     */
    async clickInvoiceButton(invoiceNo) {
        await this.page.locator('div, li')
            // Using a text matcher ensures it matches regardless of spaces between "Invoice No:" and the number
            .filter({ hasText: `Invoice No:` })
            .filter({ hasText: `${invoiceNo}` })
            // Case-corrected to match the UI screenshot label: "Invoice"
            .getByRole('button', { name: 'Invoice', exact: true })
            .click();
    }
}

export default Accounts;