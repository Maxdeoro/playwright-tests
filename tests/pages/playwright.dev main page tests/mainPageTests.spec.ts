// import { test, expect, Page, Locator } from '@playwright/test';
import { test, expect} from '../../fixtures/mainPage';
import { MainPage } from '../../models/MainPage';

// let mainPage: MainPage;

test.describe('tests main page', () => {

  // test.beforeEach(async ({page}) => {
  //   mainPage = new MainPage(page);
  //   await mainPage.openMainPage();
  // });

  test('test visibility of the navigation elements', async ({mainPage}) => {
    await mainPage.checkElementsVisibility();
  });

  test('test href attributs', async ({mainPage}) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('test correct names of the elements', async ({mainPage}) => {
    await mainPage.checkElementsText();
  });

  test('Check switch light mode of the page', async ({mainPage}) => {
    await test.step('Push the button lightMode', async () => {
      await mainPage.clickLightModeSwitch();
    });
    await test.step('Check light mode value changing', async () => {
      await mainPage.checkLightThemeAttributeValue();
    });
  });

  test('Check styles with light mode', async ({mainPage}) => {
    await test.step('Set light mode', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Chech light mode', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test('Check styles with dark mode', async ({mainPage}) => {
    await test.step('Set dark mode', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Check dark mode', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
