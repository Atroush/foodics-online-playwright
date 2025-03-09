import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { HeaderPage } from '../page-objects/headerPage';
import { NavigationPage } from '../page-objects/navigationPage';
import { EmployeesPage } from '../page-objects/employeesPage';
import { RegisterNewEmployeePage } from '../page-objects/registerNewEmployeePage';
import { DashboardPage } from '../page-objects/dashboardPage';

test.beforeEach("Login and Select The Concept", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.enterUserCredintials("skylinedynamics", "@Test123");
    await loginPage.clickOnLoginButton();
    const headerPage = new HeaderPage(page);
    await headerPage.chooseProfile("Dunkin' Egypt");
});

test("Test Add Employee", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const navigationPage = new NavigationPage(page);
    const employeesPage = new EmployeesPage(page);
    const registerNewEmployeePage = new RegisterNewEmployeePage(page);

    dashboardPage.verifyDashboardTitle();
    await page.waitForTimeout(12000);
    await navigationPage.navigateToEmployees();
    await employeesPage.openAddEmployeeForm();
    await registerNewEmployeePage.enterEmployeeDetails("Test", "User", "autoUser2", "1234567mA!", "test123@gmial.com", "Driver", "El Korba", "1234567890");
    await registerNewEmployeePage.clickOnSaveButton();
    await registerNewEmployeePage.verifySuccessNotification();
});
test("Validate Newly Created Employees", async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const employeesPage = new EmployeesPage(page);
    await page.waitForTimeout(12000);
    await navigationPage.navigateToEmployees();
    await employeesPage.verifyEmployeeExsistance("autoUser2")
})
