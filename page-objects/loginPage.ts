import { Page } from "@playwright/test";
const UIActions = require('../utils/UIActions');
export class LoginPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    usernameInputSelector = '//input[@placeholder="Username"]';
    passwordInputSelector = '//input[@placeholder="Password"]';
    loginButtonSelector = '//button[@type="submit"]';

    async enterUserCredintials(username: string, password: string) {
        await UIActions.typeText(this.page, this.usernameInputSelector, username);
        await UIActions.typeText(this.page, this.passwordInputSelector, password);
    }
    async clickOnLoginButton() {
        await UIActions.clickElement(this.page, this.loginButtonSelector);
    }
}
