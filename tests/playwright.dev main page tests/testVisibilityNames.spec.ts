import { test, expect } from '@playwright/test';

test('test visibility of the navigation elements', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
});

test('test correct names of the elements', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText('Playwright');
  await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
  await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
  await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node');
  await expect(page.getByRole('link', { name: 'Community' })).toContainText('Community');
});