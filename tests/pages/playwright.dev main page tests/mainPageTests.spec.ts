import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../../models/MainPage';

let mainPage: MainPage;

test.describe('tests main page', () => {

  test.beforeEach(async ({page}) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('test visibility of the navigation elements', async ({ page }) => {
    await mainPage.checkElementsVisibility();
  });

  test('test href attributs', async ({ page }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('test correct names of the elements', async ({ page }) => {
    await mainPage.checkElementsText();
  });

  test('Check switch light mode of the page', async ({page}) => {
    await mainPage.checkLightModeSwitch();
    await mainPage.checkLightThemeAttributeValue();
  });

  test('Check styles with light mode', async ({page}) => {
    await mainPage.setLightMode();
    await mainPage.checkLayoutWithLightMode();
  });

  test('Check styles with dark mode', async ({page}) => {
    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
  });
});
