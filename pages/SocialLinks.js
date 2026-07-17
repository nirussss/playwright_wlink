import { expect } from '@playwright/test';


class SocialLinks {

    constructor(page) {

        this.page = page;


        // Social media footer links
        this.facebook = page.locator(
            'a[href*="facebook"]'
        );

        this.instagram = page.locator(
            'a[href*="instagram"]'
        );

        this.twitter = page.locator(
            'a[href*="x.com"]'
        );

        this.youtube = page.locator(
            'a[href*="youtube"]'
        );


        // Language flags
        this.nepalFlag = page.locator(
            'img[src*="np.png"]'
        );

        this.ukFlag = page.locator(
            'img[src*="uk.png"]'
        );

    }



    async clickFacebook() {

        await expect(this.facebook)
            .toBeVisible({
                timeout: 20000
            });

        await this.facebook.click();

    }



    async clickInstagram() {

        await expect(this.instagram)
            .toBeVisible({
                timeout: 20000
            });

        await this.instagram.click();

    }



    async clickTwitter() {

        await expect(this.twitter)
            .toBeVisible({
                timeout: 20000
            });

        await this.twitter.click();

    }



    async clickYoutube() {

        await expect(this.youtube)
            .toBeVisible({
                timeout: 20000
            });

        await this.youtube.click();

    }



    async clickNepalFlag() {

        await expect(this.nepalFlag)
            .toBeVisible({
                timeout: 20000
            });

        await this.nepalFlag.click();

    }



    async clickUkFlag() {

        await expect(this.ukFlag)
            .toBeVisible({
                timeout: 20000
            });

        await this.ukFlag.click();

    }


}


export default SocialLinks;