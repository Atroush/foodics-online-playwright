import { Page } from '@playwright/test';
const UIActions = require('../utils/UIActions');
export class NavigationPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    orderesSelector = '//a[@href="/orders"]';
    employeesSelector = '//a[@href="/employees"]';
    async navigateToEmployees() {
        await UIActions.clickElement(this.page, this.employeesSelector);
    }
    async navigateToOrders() {
        await UIActions.clickElement(this.page, this.orderesSelector);
    }
}