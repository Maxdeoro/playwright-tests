import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveurl');
});

test('Checkin url changes while navigating', async ({ page }) => {
  // Задание: Проверить изменение URL при клике по ссылкам
  // 1. Нажать на ссылку "О нас"
  // 2. Проверить что URL изменился и содержит "#about"
  // 3. Нажать на ссылку "Контакты"
  // 4. Проверить что URL изменился и содержит "#contacts"
  // 5. Нажать на ссылку "Главная"
  // 6. Проверить что URL снова содержит "#home"
  const aboutUs = page.getByRole('link', {name: 'О нас'});
  await aboutUs.click();
  await expect(page).toHaveURL(/.*#about$/);

  const contacts = page.getByRole('link', {name: 'Контакты'});
  await contacts.click();
  await expect(page).toHaveURL(/.*#contacts$/);

  const mainPage = page.getByRole('link', {name: 'Главная'});
  await mainPage.click();
  await expect(page).toHaveURL(/.*#home$/);
});

test('Test URL while programming navigation', async ({ page }) => {
  // Задание: Проверить URL после программного перехода
  // 1. Нажать кнопку "Перейти в раздел"
  // 2. Проверить что URL изменился на "#contacts"
  // 3. Нажать кнопку "Вернуться назад" (back() в истории)
  // 4. Проверить что URL вернулся к "#home"
  const redirectBtn = page.getByRole('button', {name: 'Перейти в раздел'});
  await redirectBtn.click();
  await expect(page).toHaveURL(/.*#contacts$/);
  const backBtn = page.getByRole('button', {name: 'Вернуться назад'});
  await backBtn.click();
  await expect(page).toHaveURL(/.*#home$/);
});

test('Checking URL after manual input', async ({ page }) => {
  // Задание: Проверить обработку ручного ввода URL
  // 1. Перейти напрямую по URL с хешем "#about"
  // 2. Проверить что страница отображает раздел "О нас"
  // 3. Проверить что URL содержит "#about"
  // 4. Обновить страницу
  // 5. Проверить что URL сохранился с "#about"
  await page.goto('https://osstep.github.io/assertion_tohaveurl#about');
  await expect(page.getByRole('heading', {name: 'О нас'})).toBeVisible();
  await expect(page).toHaveURL(/.*#about$/);
  await page.reload();
  await expect(page).toHaveURL(/.*#about$/);
});
