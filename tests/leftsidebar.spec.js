import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import Leftsidebar from '../pages/Leftsidebar';
import { getRandomValidUser } from '../utils/userHelper';


test.describe('Left Sidebar Module', () => {
      test.describe.configure({
        mode: 'serial'
    })
    let login;
    let leftsidebar;
    test.beforeEach(async ({ page }) => {

        login = new LoginPage(page);
        leftsidebar = new Leftsidebar(page);

    });
    test('TCLS-02: Verify clicking Home displays Home section', async ({ page }) => {
        const user = getRandomValidUser();
        console.log( "Testing with:", user.username );
        await login.open();
        await login.login(
            user.username,
            user.password );
        // Wait until sidebar loads
        await expect( leftsidebar.support ).toBeVisible({  timeout: 20000 });
 // Navigate away from Home
        await leftsidebar.clickSupport();
        await leftsidebar.clickHome();
        await expect(page.getByRole('heading', {  name: 'Internet Usage' }).first()).toBeVisible();
    });

     test('TCLS-03: Verify clicking Account displays Account section', async ({ page }) => {
        const user = getRandomValidUser();
        console.log( "Testing with:", user.username );
        await login.open();
        await login.login(
            user.username,
            user.password );
        // Wait until sidebar loads
        await expect( leftsidebar.support ).toBeVisible({  timeout: 20000 });
 // Navigate away from account
        await leftsidebar.clickAccount();
        await expect(page.getByRole('heading', {  name: 'Account' }).first()).toBeVisible();
    });

     test('TCLS-04: Verify clicking Services displays Services section', async ({ page }) => {
        const user = getRandomValidUser();
        console.log( "Testing with:", user.username );
        await login.open();
        await login.login(
            user.username,
            user.password );
        // Wait until sidebar loads
        await expect( leftsidebar.support ).toBeVisible({  timeout: 20000 });
        await leftsidebar.clickServices();
        await expect(page.getByRole('heading', {  name: 'Services' }).first()).toBeVisible();
    });

   test('TCLS-05: Verify clicking Support displays Support section', async ({ page }) => {
        const user = getRandomValidUser();
        console.log( "Testing with:", user.username );
        await login.open();
        await login.login(
            user.username,
            user.password );
        // Wait until sidebar loads
        await expect( leftsidebar.home ).toBeVisible({  timeout: 20000 });
        
        await leftsidebar.clickSupport();
        await expect(page.getByRole('heading', {  name: 'Support' }).first()).toBeVisible();
    });

    
   test('TCLS-06: Verify clicking Timeline displays Timeline section', async ({ page }) => {
        const user = getRandomValidUser();
        console.log( "Testing with:", user.username );
        await login.open();
        await login.login(
            user.username,
            user.password );
        // Wait until sidebar loads
        await expect( leftsidebar.home ).toBeVisible({  timeout: 20000 });
        
        await leftsidebar.clickTimeline();
        await expect(page.getByRole('heading', {  name: 'Timeline' }).first()).toBeVisible();
    });

      test('TCLS-07: Verify clicking Refer offer displays Refer offer section', async ({ page }) => {
        const user = getRandomValidUser();
        console.log( "Testing with:", user.username );
        await login.open();
        await login.login(
            user.username,
            user.password );
        // Wait until sidebar loads
        await expect( leftsidebar.home ).toBeVisible({  timeout: 20000 });
        
        await leftsidebar.clickReferOffer();
        await expect(page.getByRole('heading', {  name: 'Refer Offer' }).first()).toBeVisible();
    });




});