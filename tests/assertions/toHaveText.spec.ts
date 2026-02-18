import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavetext');
});

test('Exact text match test', async ({ page }) => {
  // Задание: Проверить точное соответствие текста
  // 1. Найти элемент #exact-text
  // 2. Проверить что его текст точно соответствует:
  //    "This text must match exactly, including punctuation! (100%)"
  // 3. Убедиться что проверка чувствительна к регистру, пробелам и знакам препинания
  // Негативные проверки
  const exactText = page.locator('#exact-text');
  await expect(exactText).toHaveText('This text must match exactly, including punctuation! (100%)');
});

test('Testing of the operation of the counter', async ({ page }) => {
  // Задание: Проверить точное значение счетчика
  // 1. Найти элемент #counter и проверить что его текст "0"
  // 2. Нажать кнопку #increment
  // 3. Проверить что текст стал "1"
  // 4. Нажать кнопку #reset
  // 5. Проверить что текст снова "0"
  const counter = page.locator('#counter');
  await expect(counter).toHaveText('0');
  await page.locator('#increment').click();
  await expect(counter).toHaveText('1');
  await page.locator('#reset').click();
  await expect(counter).toHaveText('0');
});

test('Testing of the users card', async ({ page }) => {
  // Задание: Проверить точные тексты в карточке пользователя
  // 1. Проверить что #username содержит "user_guest"
  // 2. Проверить что #user-email содержит "guest@example.com"
  // 3. Проверить что #user-status содержит "Inactive"
  // 4. Нажать кнопку #activate-user
  // 5. Проверить что все тексты изменились точно:
  //    - username: "user_active"
  //    - email: "active.user@example.com"
  //    - status: "Active"
  const username = page.locator('#username');
  await expect(username).toHaveText('user_guest');
  const userEmail = page.locator('#user-email');
  await expect(userEmail).toHaveText('guest@example.com');
  const userStatus = page.locator('#user-status');
  await expect(userStatus).toHaveText('Inactive');
  await page.locator('#activate-user').click();
  await expect(username).toHaveText('user_active');
  await expect(userEmail).toHaveText('active.user@example.com');
  await expect(userStatus).toHaveText('Active');
});

test('Test formatted text', async ({ page }) => {
  // Задание: Проверить текст с пробелами и переносами строк
  // 1. Найти элемент #formatted-text
  // 2. Проверить что его текст точно соответствует (включая все пробелы и переносы):
  //    "Text   with   extra   spaces   and\n        line\n        breaks"
  const formattedText = page.locator('#formatted-text');
  await expect(formattedText).toHaveText('Text   with   extra   spaces   and\n        line\n        breaks');
});

test('Testing of dynamic list', async ({ page }) => {
  // Задание: Проверить точное содержание списка
  // 1. Найти элемент #items-list
  // 2. Проверить что он содержит точно:
  //    "First item\nSecond item" (для <ul> текст всех элементов объединяется с \n)
  // 3. Нажать кнопку #add-item
  // 4. Проверить что текст теперь: "First item\nSecond item\nItem 3"
  // 5. Нажать #clear-list
  // 6. Проверить что текст стал: "Empty list"
  const itemsList = page.locator('#items-list');
  await expect(itemsList).toHaveText('First item\nSecond item');
  await page.locator('#add-item').click();
  await expect(itemsList).toHaveText('First item\nSecond item\nItem 3');
  await page.locator('#clear-list').click();
  await expect(itemsList).toHaveText('Empty list');
});
