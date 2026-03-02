import { test, expect } from '@playwright/test';

test('test href attributs', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute('href','/');
  await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href','/docs/intro');
  await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute('href','/docs/api/class-playwright');
  await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute('href','/community/welcome');
});