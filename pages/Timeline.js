import { expect } from '@playwright/test';
class Timeline {

    constructor(page) {
        this.page = page;

        this.timelineLink = page.getByText('Timeline');

        this.previousMonthButton = page.getByTitle('Previous month');

        this.nextMonthButton = page.getByTitle('Next month');

        this.monthTitle = page.locator('.fc-toolbar-title');
    }


    async openTimeline() {

        await this.timelineLink.click();

    }


    async goToPreviousMonth() {

        await this.previousMonthButton.click();

    }


    async goToNextMonth() {

        await this.nextMonthButton.click();

    }

}


export default Timeline;