import { Page } from '@playwright/test';
const UIActions = require('../utils/UIActions');
export class HeaderPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    conceptDropDownSelector = '(//button[contains(@id, "toggle")])[1]';
    conceptSelector = '//p[text()="value"]/parent::div';

    async chooseConcept(profileName: string) {
        await UIActions.clickElement(this.page, this. conceptDropDownSelector);
        await UIActions.clickElement(this.page, this. conceptSelector.replace("value", profileName));
    }
}