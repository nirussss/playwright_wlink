import { expect } from '@playwright/test';

class Leftsidebar {

    constructor(page) {

        this.page = page;

        // Sidebar navigation links
        this.home = page.getByRole('link', { name: 'Home' });
        this.account = page.getByRole('link', { name: 'Account' });
        this.services = page.getByRole('link', { name: 'Services' });
        this.support = page.getByRole('link', { name: 'Support' });
        this.timeline = page.getByRole('link', { name: 'Timeline' });
        this.referOffer = page.getByRole('link', { name: 'Refer Offer' });


        // Bottom navigation buttons
        this.homeButton = page.locator(
            'button.MuiBottomNavigationAction-root',
            { hasText: 'Home' }
        );

        this.accountButton = page.locator(
            'button.MuiBottomNavigationAction-root',
            { hasText: 'Account' }
        );

        this.servicesButton = page.locator(
            'button.MuiBottomNavigationAction-root',
            { hasText: 'Services' }
        );

    }


    async clickHome() {

        await expect(this.home).toBeVisible({
            timeout: 20000
        });

        await this.home.click();

    }


    async clickAccount() {

        await expect(this.account).toBeVisible({
            timeout: 20000
        });

        await this.account.click();

    }


    async clickServices() {

        await expect(this.services).toBeVisible({
            timeout: 20000
        });

        await this.services.click();

    }


    async clickSupport() {

        await expect(this.support).toBeVisible({
            timeout: 20000
        });

        await this.support.click();

    }


    async clickTimeline() {

        await expect(this.timeline).toBeVisible({
            timeout: 20000
        });

        await this.timeline.click();

    }


    async clickReferOffer() {

        await expect(this.referOffer).toBeVisible({
            timeout: 20000
        });

        await this.referOffer.click();

    }

}

export default Leftsidebar;