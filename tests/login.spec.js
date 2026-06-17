import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test('valid login creds', async({page})=>{
const login=new  LoginPage(page);
await login.open();
await login.Login("aakashduwal","Duwals@77");
await expect(page).toHaveURL('https://customer-portal.worldlink.com.np/');
});

test('invalid login creds',async({page})=>{
  const login=new  LoginPage(page);
  await login.open();
  await login.Login("incorrectduwal","Duwals@77");
  await expect (page).toHaveText('Invalid username');

})