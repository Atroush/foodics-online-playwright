import { Page } from "@playwright/test";


export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async navigateToLoginPage() {
        await this.page.goto("https://test-merchant-app.getsolo.io/dashboard");

    }
    usernameInputLocator = '//input[@placeholder="Username"]';
    passwordInputLocator = '//input[@placeholder="Password"]';
    loginButtonLocator = '//button[@type="submit"]';
    async enterUserCredintials(username, password) {
        const usernameInput = await this.page.locator(this.usernameInputLocator);
        const passwordInput = await this.page.locator(this.passwordInputLocator);
        await usernameInput.fill(username);
        await passwordInput.fill(password);
    }
    async clickOnLoginButton() {
        const loginButton = await this.page.locator(this.loginButtonLocator);
        await loginButton.click();
    }
}
