import { Page } from '@playwright/test';
const UIActions = require('../utils/UIActions');

export class EmployeesPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    employeeUserNamSelector = '//div[text()="value"]';
    addEmployeeButtonSelector = '#newEmployee';
    editEmployeeButtonSelector = '.btn-second';
    deleteEmployeeButtonSelector = '.bg-danger';
    confirmDeleteButtonSelector = '//button[text()="OK"]';
    successDeletionNotificationSelector = '//span[text()="Employee successfully deleted!"]';

    async openAddEmployeeForm() {
        await UIActions.clickElement(this.page, this.addEmployeeButtonSelector);
    }
    async verifyEmployeeExsistance(userName: string) {
        await UIActions.waitForElementToBeVisable(this.page, this.employeeUserNamSelector.replace("value", userName));
    }
    async openEditEmployee(userName: string) {
        await UIActions.clickElementInRow(this.page, userName, this.editEmployeeButtonSelector);

    }
    async deleteEmployee(userName: string) {
        await UIActions.clickElementInRow(this.page, userName, this.deleteEmployeeButtonSelector);
        await UIActions.clickElement(this.page, this.confirmDeleteButtonSelector);
    }
    async verifyEmployeeDeleted() {
        await UIActions.waitForElementToBeVisable(this.page, this.successDeletionNotificationSelector);
    }
    async verifyEmployeeNotExist(userName: string) {
        return await UIActions.isElementNotVisible(this.page, this.employeeUserNamSelector.replace("value", userName));
    }
}