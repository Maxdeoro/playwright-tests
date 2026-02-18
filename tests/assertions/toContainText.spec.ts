import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tocontaintext');
});

test('Test of static text', async ({ page }) => {
  // Задание: Проверить, что статический текстовый блок содержит определенные подстроки
  // 1. Найти элемент #static-text
  // 2. Проверить что он содержит текст "static text block"
  // 3. Проверить что он содержит текст "important information"
  // 4. Проверить что он НЕ содержит текст "dynamic content"
  const staticText = page.locator('#static-text');
  await expect(staticText).toContainText('static text block');
  await expect(staticText).toContainText('important information');
  await expect(staticText).not.toContainText('dynamic content');
});

test('Test of dynamically changing text', async ({ page }) => {
  // Задание: Проверить изменение динамического текста
  // 1. Найти элемент #dynamic-text и проверить что он содержит "Initial dynamic text"
  // 2. Нажать кнопку #change-text
  // 3. Проверить что текст теперь содержит "Text was changed at"
  // 4. Нажать кнопку #add-part
  // 5. Проверить что текст теперь содержит "(additional part)"
  const dynamicText = page.locator('#dynamic-text');
  await expect(dynamicText).toContainText('Initial dynamic text');
  const changeText = page.locator('#change-text');
  await changeText.click();
  await expect(dynamicText).toContainClass('Text was changed at');
  const addPart = page.locator('#add-part');
  await addPart.click();
  await expect(dynamicText).toContainText('(additional part)');
});

test('List of elements test', async ({ page }) => {
  // Задание: Проверить содержимое списка
  // 1. Найти элемент #item-list
  // 2. Проверить что он содержит текст "Item 1: Basic"
  // 3. Проверить что он содержит текст "Intermediate"
  // 4. Нажать кнопку #add-item
  // 5. Проверить что список теперь содержит текст "New added item"
  const itemList = page.locator('#item-list');
  await expect(itemList).toContainText('Item 1: Basic');
  await expect(itemList).toContainText('Intermediate');
  await page.locator('#add-item').click();
  await expect(itemList).toContainText('New added item');
});

test('Testing hidden/displayed text', async ({ page }) => {
  // Задание: Проверить отображение скрытого текста
  // 1. Найти элемент #hidden-content и проверить что он не видим
  // 2. Нажать кнопку #toggle-text
  // 3. Проверить что элемент теперь содержит текст "special content"
  // 4. Проверить что элемент содержит текст "hidden but now is visible"
  const hiddenContent = page.locator('#hidden-content');
  await expect(hiddenContent).not.toBeVisible();
  await page.locator('#toggle-text').click();
  await expect(hiddenContent).toBeVisible();
  await expect(hiddenContent).toContainText('special content');
  await expect(hiddenContent).toContainText('hidden but now is visible');
});

test('Partial Match test for Long Text', async ({ page }) => {
  // Задание: Проверить частичные совпадения в длинном тексте
  // 1. Найти элемент #partial-text
  // 2. Проверить что он содержит "quick brown fox"
  // 3. Проверить что он содержит "lazy dog"
  // 4. Проверить что он содержит "all letters of the English alphabet"
  // 5. Проверить что он НЕ содержит "all letters of the Russian alphabet"
  const partialText = page.locator('#partial-text');
  await expect(partialText).toContainText('quick brown fox');
  await expect(partialText).toContainText('lazy dog');
  await expect(partialText).toContainText('all letters of the English alphabet');
  await expect(partialText).not.toContainText('all letters of the Russian alphabet');
});
