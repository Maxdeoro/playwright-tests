import { test, expect } from 'playwright/test';

test('example test', async ({page}) => {
    await page.goto('https://stepik.org/catalog');
    // await expect(page.getByPlaceholder('Название курса, автор или предмет')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Profile'})).toBeVisible();
});