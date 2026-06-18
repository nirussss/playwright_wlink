class LoginPage{
    constructor(page){
        this.page=page;
        this.username=page.locator("input[name='username']");
        this.password=page.locator("input[name='password']");
        this.loginBtn=page.getByRole('button', { name: 'Login' });
    }
    async open(){
        await this.page.goto('https://customer-portal.worldlink.com.np/eservice-login');
    }

    async login(user,pass){
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click()

    }
}
export default LoginPage;
