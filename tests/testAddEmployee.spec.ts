import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { HeaderPage } from '../page-objects/headerPage';
import { NavigationPage } from '../page-objects/navigationPage';
import { EmployeesPage } from '../page-objects/employeesPage';
import { RegisterNewEmployeePage } from '../page-objects/registerNewEmployeePage';
import { DashboardPage } from '../page-objects/dashboardPage';
import { JsonHelper } from '../utils/jsonHelper';
import { BrowserActions } from '../utils/browserActions';
import { Helper } from '../utils/Helper';
import { ConfigReader } from '../utils/configReader';


var userName;
const jsonHelper = new JsonHelper();
const configReader = new ConfigReader('config/test-config.properties');
const helper = new Helper();
test.beforeEach("Login and Select The Concept", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const loginPage = new LoginPage(page);
    const headerPage = new HeaderPage(page);
    const navigationPage = new NavigationPage(page);

    const browserActions = new BrowserActions();
    await jsonHelper.readJsonFile("test-data/createEmployee.json");

    await browserActions.navigateTo(page, configReader.get("url"));
    await loginPage.enterUserCredintials(configReader.get("username"), configReader.get("password"));
    await loginPage.clickOnLoginButton();
    await headerPage.chooseConcept(configReader.get("conceptName"));
    await dashboardPage.verifyDashboardTitle();
    await page.waitForTimeout(12000);
    await navigationPage.navigateToEmployees();
});

test("FOM-1329 verify that user can Add a New Employee Successfully", async ({ page }) => {

    const employeesPage = new EmployeesPage(page);
    const registerNewEmployeePage = new RegisterNewEmployeePage(page);
    var employeeData = await jsonHelper.getObjectByName('employeeData');
    if (employeeData == undefined) {
        console.log("employeeData is undefined");
    } else {
        await employeesPage.openAddEmployeeForm();
        jsonHelper.updateAttribute("employeeData", "updatedUserName", helper.appendDateTime(employeeData.userName));
        await registerNewEmployeePage.enterEmployeeDetails(employeeData.firstName, employeeData.lastName, employeeData.updatedUserName, employeeData.password, employeeData.email, employeeData.mobile, employeeData.role, employeeData.location);
        await registerNewEmployeePage.clickOnSaveButton();
        await registerNewEmployeePage.verifySuccessNotification();
    }
});
test("FOM-1327 Validate the existance of the Newly Created Employees", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);

    var employeeData = await jsonHelper.getObjectByName('employeeData');
    if (employeeData == undefined) {
        console.log("employeeData is undefined");
    } else {
        userName = employeeData.updatedUserName;
        await employeesPage.verifyEmployeeExsistance(userName)
    }
})
test("FOM-1331 verify user can Edit Employee - Change Role and Locations", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);
    const registerNewEmployeePage = new RegisterNewEmployeePage(page);

    var employeeData = await jsonHelper.getObjectByName('employeeData');
    var editEmployeeData = await jsonHelper.getObjectByName('editEmployee');

    if (editEmployeeData == undefined || employeeData == undefined) {
        console.log("employeeData is undefined");
    } else {
        await employeesPage.openEditEmployee(employeeData.updatedUserName);
        await registerNewEmployeePage.selectRole(editEmployeeData.role);
        await registerNewEmployeePage.selectLocation(editEmployeeData.location);
        await registerNewEmployeePage.clickOnUpdateButton();
        await registerNewEmployeePage.verifyEmployeeUpdatedSuccessfully();
    }
});

test("FOM-1347 - Employee - Verify user can Delete an Employee", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);

    var employeeData = await jsonHelper.getObjectByName('employeeData');
    if (employeeData == undefined) {
        console.log("employeeData is undefined");
    } else {
        await employeesPage.deleteEmployee(employeeData.updatedUserName);
        await employeesPage.verifyEmployeeDeleted();
        await employeesPage.verifyEmployeeNotExist(employeeData.updatedUserName);
    }
})
