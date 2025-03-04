import { Page, expect } from '@playwright/test';

export class EmployeesPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    employeeUserNameLocator = '//div[text()="value"]';
    addEmployeeButtonLocator = '#newEmployee';
    loaderLocator = '//div[@class="el-loading-spinner"]'
    async openAddEmployeeForm() {
        await this.page.click(this.addEmployeeButtonLocator);
    }
    async verifyEmployeeExsistance(userName: string) {
        const employeeUserName = this.page.locator(this.employeeUserNameLocator.replace("value", userName));
        await expect(employeeUserName).toBeVisible();
    }
}