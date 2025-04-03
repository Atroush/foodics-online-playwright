import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { HeaderPage } from '../page-objects/headerPage';
import { NavigationPage } from '../page-objects/navigationPage';
import { EmployeesPage } from '../page-objects/employeesPage';
import { RegisterNewEmployeePage } from '../page-objects/registerNewEmployeePage';
import { DashboardPage } from '../page-objects/dashboardPage';
import { JsonHelper } from '../utils/jsonHelper';
import {BrowserActions}from'../utils/browserActions';
import { Helper } from '../utils/Helper';
import { json } from 'stream/consumers';

var employeeData;
var userName;
const jsonHelper = new JsonHelper();
const helper= new Helper();
test.beforeEach("Login and Select The Concept", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const loginPage = new LoginPage(page);
    const headerPage = new HeaderPage(page);
    const navigationPage = new NavigationPage(page);

    const browserActions = new BrowserActions();
    await jsonHelper.readJsonFile("test-data/createEmployee.json");
    employeeData = await jsonHelper.getObjectByName('employeeData');
    if(employeeData == undefined){
        console.log("employeeData is undefined");
    }
   
    
    await browserActions.navigateTo(page, "https://staging-app.getsolo.io");
    await loginPage.enterUserCredintials("skylinedynamics", "@Test123");
    await loginPage.clickOnLoginButton();
    await headerPage.chooseProfile("Dunkin' Egypt");
    await dashboardPage.verifyDashboardTitle();
    await page.waitForTimeout(12000);
    await navigationPage.navigateToEmployees();
});

test("Test Add Employee", async ({ page }) => {
   
    const employeesPage = new EmployeesPage(page);
    const registerNewEmployeePage = new RegisterNewEmployeePage(page);
    
    await employeesPage.openAddEmployeeForm();
    jsonHelper.updateAttribute("employeeData","updatedUserName", helper.appendDateTime(employeeData.userName));
    userName = employeeData.updatedUserName;
    await registerNewEmployeePage.enterEmployeeDetails(employeeData.firstName, employeeData.lastName, userName, employeeData.password, employeeData.email, employeeData.mobile, employeeData.role, employeeData.location);
    await registerNewEmployeePage.clickOnSaveButton();
    await registerNewEmployeePage.verifySuccessNotification();
});
test("Validate Newly Created Employees", async ({ page }) => {
    const employeesPage = new EmployeesPage(page);
    userName = employeeData.updatedUserName;
    await employeesPage.verifyEmployeeExsistance(userName)
})
