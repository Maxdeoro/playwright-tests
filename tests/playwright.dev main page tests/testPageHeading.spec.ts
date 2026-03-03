import { test, expect } from '@playwright/test';

test('test page heading', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
});