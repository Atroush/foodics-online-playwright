import { expect, Page } from '@playwright/test';
export class HeaderPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    profileDropDownLocator = '(//button[contains(@id, "toggle")])[1]';
    profileLocator = '//p[text()="value"]/parent::div';

    async chooseProfile(profileName: string) {
        const profileDropDown = this.page.locator(this.profileDropDownLocator);
        const profileElement = this.page.locator(this.profileLocator.replace("value", profileName));

        await profileDropDown.click();
        await profileElement.click();
    }
}