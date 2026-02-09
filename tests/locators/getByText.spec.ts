import { test, expect } from '@playwright/test';

test.describe('Tests for getByText()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  // Задание 1: Найди параграф с точным текстом "Это обычный параграф текста для поиска"
  // Проверь что элемент видим на странице
  test('Get element by text', async ({ page }) => {
    const paragraph = page.getByText("Это обычный параграф текста для поиска");
      await expect(paragraph).toBeVisible();
  });

  // Задание 2: Найди span-элемент с текстом "Текст внутри span"
  // Проверь что элемент существует
  test('Get span by text', async ({ page }) => {
    const spanElement = page.locator('span:has-text("Текст внутри span")');
      await expect(spanElement).toBeVisible();
  });
});

test.describe('Поиск по частичному совпадению', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  // Задание 1: Найди элемент содержащий подстроку "важную информацию"
  // Проверь что элемент имеет класс partial-match
  test('Get by partial match', async ({ page }) => {
    const partialText = page.getByText('важную информацию', {exact: false});
      await expect(partialText).toBeVisible();
    await expect(partialText).toHaveClass('partial-match');
  });

  // Задание 2: Найди элемент списка содержащий слово "Специальный"
  // Проверь что это действительно элемент списка (li)
  test('Get element by part of the text', async ({ page }) => {
    const listItem = page.getByText('Специальный');
      await expect(listItem).toBeVisible();
  });
});

test.describe('Complex Text Search Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  // Задание 1: Найди вложенный текст внутри span
  // Проверь что span находится внутри параграфа
  test('Get nested text', async ({ page }) => {
    const nestedSpan = page.locator('span:has-text("вложенным текстом")');
      await expect(nestedSpan).toBeVisible();
    await expect(nestedSpan).toHaveText('вложенным текстом');
    const parent = await nestedSpan.locator('..');
    await expect(parent).toHaveText(/Параграф с вложенным текстом внутри/);
  });

  // Задание 2: Дождись появления динамического текста и найди его
  // Проверь что текст появился через 1 секунду
  test('Working with dynamic content', async ({ page }) => {
    const dynamicText = page.getByText('Этот текст появился после загрузки страницы');
      await expect(dynamicText).toBeVisible({ timeout: 2000 });
  });

  // Задание 3: Найди текст с множественными пробелами
  // Используй регулярное выражение для поиска
  test('Find text with spaces', async ({ page }) => {
    const spacedText = page.getByText(/Текст с\s+множественными\s+пробелами/);
      await expect(spacedText).toBeVisible();
  });
});
