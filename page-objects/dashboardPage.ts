import { Page } from '@playwright/test';
const UIActions = require('../utils/UIActions');

export class DashboardPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    dashboardTitleSelector = '//span[@aria-current="location"]//span[text()="Dashboard"]';
    
    async verifyDashboardTitle() {
       await UIActions.waitForElementToBeVisable(this.page, this.dashboardTitleSelector);
    }
}