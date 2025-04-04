// utils/UIActions.js
class UIActions {
  // Click on an element
  async clickElement(page, selector) {
    await page.click(selector);
  }

  // Type text into an input field
  async typeText(page, selector, text) {
    await page.fill(selector, text);
  }

  // Get text from an element
  async getText(page, selector) {
    return await page.textContent(selector);
  }

  async waitForElementToBeVisable(page, selector) {
    const locator = page.locator(selector);
  await locator.waitFor({ state: 'visible', timeout: 9000 }); 
  }
  async waitForElementToBeHidden(page, selector) {
    await page.waitForSelector(selector, { state: 'hidden' });
  }
  // Verify if an element exists
  async elementExists(page, selector) {
    const element = await page.$(selector);
    return element !== null;
  }

  // Select from a dropdown
  async selectOption(page, selector, optionValue) {
    await page.selectOption(selector, optionValue);
  }

  // Hover over an element
  async hoverOverElement(page, selector) {
    await page.hover(selector);
  }

  // Check if an element is visible
  async isElementVisible(page, selector) {
    const element = await page.$(selector);
    return element ? await element.isVisible() : false;
  }
}

module.exports = new UIActions();
