import { expect, test } from '@playwright/test';

class QuickLinks {
    constructor(page) {
        this.page = page;
        // Targets the precise visible text element inside the material card structure
        this.cardTextElement = (cardText) => this.page.locator('.MuiCard-root').getByText(cardText, { exact: true });
    }

    /**
     * Dynamically finds any Quick Link card text and clicks it securely.
     * @param {string} cardText - The unique text identifier on the card
     */
    async clickCard(cardText) {
        const clickable = this.cardTextElement(cardText);
        await clickable.scrollIntoViewIfNeeded();
        await clickable.click();
    } 
}
export default QuickLinks;