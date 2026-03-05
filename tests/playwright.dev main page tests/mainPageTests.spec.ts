import { test, expect } from '@playwright/test';

test.describe('tests main page', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('https://playwright.dev');
  });

  test.skip('test button Get started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', {name: 'Get started'})).toContainText('Get started');
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href','/docs/intro');
  });

  test.fixme('test href attributs', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute('href','/');
    await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href','/docs/intro');
    await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute('href','/docs/api/class-playwright');
    await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute('href','/community/welcome');
  });

  test.only('test page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
  });

  test('test visibility of the navigation elements', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
  });

  test('test correct names of the elements', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText('Playwright');
    await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node');
    await expect(page.getByRole('link', { name: 'Community' })).toContainText('Community');
  });
});

