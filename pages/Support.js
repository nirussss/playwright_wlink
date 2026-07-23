import { expect } from '@playwright/test';


class Support {

    constructor(page) {

        this.page = page;


        // Sidebar
        this.supportLink = page.getByRole('link', {
            name: 'Support'
        });



        // Support filter buttons
        this.allButton = page.getByRole('button', {
            name: 'All'
        });


        this.solvedButton = page.getByRole('button', {
            name: 'Solved'
        });


        this.pendingButton = page.getByRole('button', {
            name: 'Pending'
        });



        // Other support buttons
        this.filterButton = page.getByRole('button', {
            name: 'Filter'
        });


        this.clearButton = page.getByRole('button', {
            name: 'Clear'
        });


        this.reportProblemButton = page.getByRole('button', {
            name: 'Report Problem'
        });


    }



    async openSupport() {

        await expect(this.supportLink)
            .toBeVisible({
                timeout: 20000
            });

        await this.supportLink.click();

    }




    async clickAll() {

        await expect(this.allButton)
            .toBeVisible();

        await expect(this.allButton)
            .toBeEnabled();

        await this.allButton.click();

    }




    async clickSolved() {

        await expect(this.solvedButton)
            .toBeVisible();

        await expect(this.solvedButton)
            .toBeEnabled();

        await this.solvedButton.click();

    }




    async clickPending() {

        await expect(this.pendingButton)
            .toBeVisible();

        await expect(this.pendingButton)
            .toBeEnabled();

        await this.pendingButton.click();

    }




    async clickFilter() {

        await expect(this.filterButton)
            .toBeVisible();

        await expect(this.filterButton)
            .toBeEnabled();

        await this.filterButton.click();

    }








   


}


export default Support;