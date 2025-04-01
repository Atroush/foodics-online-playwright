// utils/BrowserActions.js
class BrowserActions {
  // Navigate to a URL
  async navigateTo(page, url) {
    await page.goto(url);
  }

  // Close the browser
  async closeBrowser(browser) {
    await browser.close();
  }

  // Open a new tab (context)
  async openNewTab(browser) {
    const context = await browser.newContext();
    const page = await context.newPage();
    return page;
  }

  // Handle cookies (example: get all cookies)
  async getCookies(page) {
    return await page.context().cookies();
  }

  // Take a screenshot of the entire page
  async takeScreenshot(page, filePath) {
    await page.screenshot({ path: filePath });
  }

  // Switch to a specific frame (if applicable)
  async switchToFrame(page, frameName) {
    const frame = page.frame({ name: frameName });
    return frame;
  }
}

module.exports = new BrowserActions();
