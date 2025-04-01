import { Page } from '@playwright/test';
const UIActions = require('../utils/UIActions');

export class EmployeesPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    employeeUserNamSelector = '//div[text()="value"]';
    addEmployeeButtonSelector = '#newEmployee';
    
    async openAddEmployeeForm() {
        await UIActions.clickElement(this.page, this.addEmployeeButtonSelector);
    }
    async verifyEmployeeExsistance(userName: string) {
        await UIActions.waitForElementToBeVisable(this.page, this.employeeUserNamSelector.replace("value", userName));
    }
}