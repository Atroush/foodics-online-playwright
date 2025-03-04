import { Page } from '@playwright/test';
export class NavigationPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    orderesLocator = '//a[@href="/orders"]';
    employeesLocator = '//a[@href="/employees"]';
    async navigateToEmployees() {
        const employees = this.page.locator(this.employeesLocator);
        await employees.click();
    }
    async navigateToOrders() {
        const orders = this.page.locator(this.orderesLocator);
        await orders.click();
    }
}