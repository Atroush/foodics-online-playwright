import {Page} from '@playwright/test';
export class DashboardPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    dashboardTitleLocator = '//span[@aria-current="location"]//span[text()="Dashboard"]';
    async verifyDashboardTitle() {
        const dashboardTitle = this.page.locator(this.dashboardTitleLocator);
        await dashboardTitle.waitFor({state: 'visible'});
    }
}