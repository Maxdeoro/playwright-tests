import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByPlaceholder()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getplaceholder');
  });

  // Задание 1: Найди поле с placeholder "Введите ваше имя"
  // Заполни его текстом "Иван Иванов" и проверь значение
  test('Get and fill field placeholder', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Введите ваше имя');
      await nameInput.fill('Иван Иванов');
    await expect(nameInput).toHaveValue('Иван Иванов');
  });

  // Задание 2: Найди email поле по частичному совпадению placeholder "example@"
  // Проверь что тип поля - email
  test('Найти поле по частиGet field by part of placeholder', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/example@/);
      await expect(emailInput).toHaveAttribute('type', 'email');
  });
});

test.describe('Complex cases for getByPlaceholder()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getplaceholder');
  });

  // Задание 1: Найди textarea с многострочным placeholder
  // Проверь что это действительно textarea
  test('Get textarea by multi-line placeholder', async ({ page }) => {
    const textarea = page.getByPlaceholder('Введите ваш комментарий здесь...');
      await expect(textarea).toBeVisible();
  });

  // Задание 2: Найди поле с пробелами в placeholder
  test('Get field with spaces in placeholder', async ({ page }) => {
    const spacedInput = page.getByPlaceholder(' Поле с пробелами в начале ');
      await expect(spacedInput).toBeVisible();
  });

  // Задание 3: Дождись появления динамического поля и найди его по placeholder
  test('Work with dynamic fields', async ({ page }) => {
    const dynamicInput = page.getByPlaceholder('dynamic@example.com');
      await expect(dynamicInput).toBeVisible({ timeout: 2000 });
  });
});
