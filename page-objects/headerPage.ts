import { Page } from '@playwright/test';
const UIActions = require('../utils/UIActions');
export class HeaderPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    profileDropDownSelector = '(//button[contains(@id, "toggle")])[1]';
    profileSelector = '//p[text()="value"]/parent::div';

    async chooseProfile(profileName: string) {
        await UIActions.clickElement(this.page, this.profileDropDownSelector);
        await UIActions.clickElement(this.page, this.profileSelector.replace("value", profileName));
    }
}