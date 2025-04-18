import { Page } from '@playwright/test';

const UIActions = require('../utils/UIActions');
export class RegisterNewEmployeePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    firstNameInputSelector = '//label[text()="First Name"]/parent::div//input';
    lastNameInputSelector = '//label[text()="Last Name"]/parent::div//input';
    userNameInputSelector = '//label[text()="Username"]/parent::div//input';
    passwordInputSelector = '//label[text()="Password"]/parent::div//input';
    emailInputSelector = '//label[text()="Email"]/parent::div//input';
    mobileInputSelector = '//label[text()="Mobile"]/parent::div//input';
    roleDropDownButtonSelector = '//label[text()="Roles"]/parent::div//input';
    roleSelector = '//li[@name="value"]';
    locationsDropDownButtonSelector = '//label[text()="Locations"]/parent::div//div[@class="el-select__tags"]//input';
    locationSelector = '//li[@name="value"]';
    saveButtonSelector = '//button[text()="Save"]';
    updateButtonSelector='//button[text()="Update"]';
    loaderSelector = '//div[@class="el-loading-spinner"]'
    successNotificationSelector = '//span[text()="Employee successfully created!"]';
    employeeUpdatedNotificationSelector = '//span[text()="Employee successfully updated!"]';

    async enterEmployeeDetails(firstName: string, lastName: string, userName: string, password: string, email: string, mobile: string, role: string, location: string) {
        await UIActions.waitForElementToBeHidden(this.page, this.loaderSelector);
        await UIActions.typeText(this.page, this.firstNameInputSelector, firstName);
        await UIActions.typeText(this.page, this.lastNameInputSelector, lastName);
        await UIActions.typeText(this.page, this.userNameInputSelector, userName);
        await UIActions.typeText(this.page, this.passwordInputSelector, password);
        await UIActions.typeText(this.page, this.emailInputSelector, email);
        await UIActions.typeText(this.page, this.mobileInputSelector, mobile);
        await this.selectRole(role);
        await this.selectLocation(location);
    }
    async selectRole(role: string) {
        await UIActions.clickElement(this.page, this.roleDropDownButtonSelector);
        await UIActions.clickElement(this.page, this.roleSelector.replace("value", role));
    }
    async selectLocation(location: string) {
        await UIActions.clickElement(this.page, this.locationsDropDownButtonSelector);
        await UIActions.clickElement(this.page, this.locationSelector.replace("value", location));
    }
    async clickOnSaveButton() {
        await UIActions.clickElement(this.page, this.saveButtonSelector);
    }
    async clickOnUpdateButton() {
        await UIActions.clickElement(this.page, this.updateButtonSelector);
    }   
    async verifySuccessNotification() {
        await UIActions.waitForElementToBeVisable(this.page, this.successNotificationSelector);
    }
    async verifyEmployeeUpdatedSuccessfully() {
        await UIActions.waitForElementToBeVisable(this.page, this.employeeUpdatedNotificationSelector);
    }

}