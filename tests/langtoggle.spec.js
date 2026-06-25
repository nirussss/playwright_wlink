import {test, expect} from '@playwright/test';

test("nepali language toggle check",  async({page})=>{

    await page.goto('/eservice-login');
    await page.getByRole('img', { name: 'language' }).first().click();
    await expect(page.getByRole('heading', { name: 'ग्राहक पोर्टल' })).toBeVisible();

});

test("english language toggle check",  async({page})=>{

    await page.goto('/eservice-login');
    await page.getByRole('img', { name: 'language' }).nth(1).click();
   await  expect(page.getByRole('heading', { name: 'Customer Portal' })).toBeVisible();
});