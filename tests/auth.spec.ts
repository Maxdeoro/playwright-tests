import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://stepik.org/catalog?auth=login');
    await page.getByRole('textbox', {name: 'E-mail'}).fill('playwright_auth@mail.ru');
    await page.getByRole('textbox', {name: 'Пароль'}).fill('Zxcvbnm123');
    await page.getByRole('button', {name: 'Войти'}).click();
    await page.getByRole('link', {name: 'Моё обучение'}).click();
    await page.getByRole('link', {name: 'Прохожу'}).click();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});