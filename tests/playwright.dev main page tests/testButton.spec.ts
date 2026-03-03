import { test, expect } from '@playwright/test';

test('test button Get started', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('link', {name: 'Get started'})).toContainText('Get started');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href','/docs/intro');
});
