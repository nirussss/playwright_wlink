import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import SocialLinks from '../pages/SocialLinks';
import { getRandomValidUser } from '../utils/userHelper';



test.describe('Social Links Module', () => {
    test.describe.configure({mode: 'serial'});
    let login;
    let socialLinks;

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        socialLinks = new SocialLinks(page);
    });
    test('TC_SOC_01: Verify social media footer icons open correct pages', async ({ page }) => {
        const user = getRandomValidUser();
        console.log(  "Testing with:", user.username );
        await login.open();
        await login.login(
            user.username,
            user.password
        );
        await page.waitForLoadState('networkidle');

        const fbPopup = page.waitForEvent('popup');
        await socialLinks.clickFacebook();
        const fb = await fbPopup;
        await expect(fb)
            .toHaveURL(/facebook\.com\/wlink\.np/);

        // Instagram
        const instagramPopup = page.waitForEvent('popup');
        await socialLinks.clickInstagram();
        const instagram = await instagramPopup;
        await expect(instagram)
            .toHaveURL(/instagram\.com\/wlinkcommunications/);

        // X
        const twitterPopup = page.waitForEvent('popup');
        await socialLinks.clickTwitter();
        const twitter = await twitterPopup;
        await expect(twitter)
            .toHaveURL(/x\.com\/WLinkComm/);

        // YouTube
        const youtubePopup = page.waitForEvent('popup');
        await socialLinks.clickYoutube();
        const youtube = await youtubePopup;
        await expect(youtube)
            .toHaveURL(/youtube\.com\/c\/WorldLinkCommunications/);
    });

    test('TC_SOC_02: Verify language flag switches display text language formats successfully', async ({ page }) => {
        const user = getRandomValidUser();
        console.log(
            "Testing with:",
            user.username
        );
        await login.open();
        await login.login(
            user.username,
            user.password
        );

        await page.waitForLoadState('networkidle');// waiting until dashboard is loaded
       

        await expect(page.getByText('Home') ).toBeVisible({ timeout: 20000});

        await socialLinks.clickNepalFlag();
        await expect(page.getByText('गृहपृष्ठ') ).toBeVisible({timeout: 10000});
        await socialLinks.clickUkFlag();
        await expect(page.getByText('Home')   ).toBeVisible({timeout: 10000    });
    });
});