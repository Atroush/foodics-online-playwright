import { expect, Page } from '@playwright/test';
export class RegisterNewEmployeePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    firstNameInputLocator = '//label[text()="First Name"]/parent::div//input';
    lastNameInputLocator = '//label[text()="Last Name"]/parent::div//input';
    userNameInputLocator = '//label[text()="Username"]/parent::div//input';
    passwordInputLocator = '//label[text()="Password"]/parent::div//input';
    emailInputLocator = '//label[text()="Email"]/parent::div//input';
    roleDropDownButtonLocator = '//label[text()="Roles"]/parent::div//input';
    roleLocator = '//li[@name="value"]';
    locationsDropDownButtonLocator = '//label[text()="Locations"]/parent::div//div[@class="el-select__tags"]//input';
    locationLocator = '//li[@name="value"]';
    saveButtonLocator = '//button[text()="Save"]';
    loaderLocator = '//div[@class="el-loading-spinner"]'
    successNotificationLocator = '//span[text()="Employee successfully created!"]';
    mobileNumberInputLocator = '//input[@type="number"]';

    async enterEmployeeDetails(firstName: string, lastName: string, userName: string, password: string, email: string, role: string, location: string, mobileNumber: string) {
        await this.page.waitForSelector(this.loaderLocator, { state: 'hidden' });
        const firstNameInput = this.page.locator(this.firstNameInputLocator);
        const lastNameInput = this.page.locator(this.lastNameInputLocator);
        const userNameInput = this.page.locator(this.userNameInputLocator);
        const passwordInput = this.page.locator(this.passwordInputLocator);
        const emailInput = this.page.locator(this.emailInputLocator);
        const mobileNumberInput = this.page.locator(this.mobileNumberInputLocator);

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await userNameInput.fill(userName);
        await passwordInput.fill(password);
        await emailInput.fill(email);
        await this.selectRole(role);
        await this.selectLocation(location);
        await mobileNumberInput.fill('1234567890');

    }
    async selectRole(role: string) {
        const roleDropDownButton = this.page.locator(this.roleDropDownButtonLocator);
        await roleDropDownButton.click();

        const roleElement = this.page.locator(this.roleLocator.replace("value", role));
        await roleElement.click();
    }
    async selectLocation(location: string) {
        const locationsDropDownButton = this.page.locator(this.locationsDropDownButtonLocator);
        await locationsDropDownButton.click();

        const locationElement = this.page.locator(this.locationLocator.replace("value", location));
        await locationElement.click();
    }
    async clickOnSaveButton() {
        const saveButton = this.page.locator(this.saveButtonLocator);
        await saveButton.click();
    }
    async verifySuccessNotification() {
        const successNotification = this.page.locator(this.successNotificationLocator);
        await successNotification.waitFor({ state: 'visible' });
        expect(successNotification).toBeVisible();
    }

}