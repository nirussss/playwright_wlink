import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import Support from '../pages/Support';
import { getRandomValidUser } from '../utils/userHelper';



test.describe('Support Module', () => {


    test.describe.configure({
        mode: 'serial'
    });



    let login;
    let support;



    test.beforeEach(async ({ page }) => {


        login = new LoginPage(page);
        support = new Support(page);


    });




    test('Verify support buttons are clickable', async ({ page }) => {



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



        // Wait until dashboard is loaded
        await page.waitForLoadState('networkidle');



        // Open Support section
        await support.openSupport();



        // Verify filter buttons
        await support.clickAll();

        await support.clickSolved();

        await support.clickPending();



        // Verify filter functionality
        await support.clickFilter();



        await support.clickClear();



        // Verify Report Problem button
        await support.clickReportProblem();



    });


});