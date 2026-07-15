import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import Timeline from '../pages/Timeline';
import { getRandomValidUser } from '../utils/userHelper';


test.describe('Timeline Module', () => {

    let login;
    let timeline;


    test.beforeEach(async ({page}) => {

        login = new LoginPage(page);
        timeline = new Timeline(page);

    });



    test('TCT-01: Verify previous month navigation button works properly', async ({page}) => {
    const user = getRandomValidUser();
    console.log("Testing with user:", user.username);
    await login.open();
    await login.login(
        user.username,
        user.password
    );
    await timeline.openTimeline();
    const initialMonth = await timeline.monthTitle.textContent();
    console.log("Before click:", initialMonth);
    await timeline.goToPreviousMonth();
    await expect(timeline.monthTitle).not.toHaveText(initialMonth);
    const updatedMonth = await timeline.monthTitle.textContent();

    console.log("After click:", updatedMonth);

});

  test('TCT-02: Verify next month navigation button works properly', async ({page}) => {

    const user = getRandomValidUser();
    console.log("Testing with user:", user.username);
    await login.open();
    await login.login(
        user.username,
        user.password
    );
    await timeline.openTimeline();
    const currentMonth = await timeline.monthTitle.textContent();
    console.log("Before click:", currentMonth);
await expect( timeline.nextMonthButton).toBeVisible();
 await timeline.goToNextMonth();
    await expect(timeline.monthTitle).not.toHaveText(currentMonth);
    const updatedMonth = await timeline.monthTitle.textContent();
    console.log("After click:", updatedMonth);
});

});