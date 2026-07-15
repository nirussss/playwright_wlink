import { expect } from '@playwright/test';

class Timeline {

    constructor(page) {
        this.page = page;
        this.timelineLink = page.getByRole('link', { name: 'Timeline' });
        this.previousMonthButton = page.getByTitle('Previous month');
        this.nextMonthButton = page.getByTitle('Next month');
        this.monthTitle = page.locator('.fc-toolbar-title');
    }


    async openTimeline() {
        await expect(this.timelineLink).toBeVisible({
            timeout: 20000
        });
        await this.timelineLink.click();

        await expect(this.monthTitle).toBeVisible({
            timeout: 20000
        });
    }

    async goToPreviousMonth() {
        await expect(this.previousMonthButton).toBeVisible();
        await this.previousMonthButton.click();
    }


    async goToNextMonth() {
        await expect(this.nextMonthButton).toBeVisible();
        await this.nextMonthButton.click();
    }
}

export default Timeline;