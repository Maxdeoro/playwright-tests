import { test, expect } from '@playwright/test';

test.describe('Fill fields of the form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  // Тест 1: Заполнение текстового поля
  // 1. Найти поле "Имя пользователя" по label
  // 2. Заполнить поле значением "Иван Иванов"
  // 3. Проверить что значение установлено правильно
  test('Fill the text field', async ({ page }) => {
    const usernameField = page.getByLabel('Имя пользователя');
    await usernameField.fill('John Snow');
    await expect(usernameField).toHaveValue('John Snow');
  });

  // Тест 2: Заполнение email с валидацией
  // 1. Найти поле email по placeholder
  // 2. Заполнить некорректным email (без @)
  // 3. Проверить появление сообщения об ошибке
  // 4. Заполнить корректным email
  // 5. Проверить исчезновение ошибки
  test('Fill email with validation', async ({ page }) => {
    const emailField = page.getByPlaceholder('example@mail.com');
    const errorFeedback = page.getByText('Введите корректный email');

    await emailField.fill('examplemail.com');
    await emailField.blur(); // Триггерим валидацию
    await expect(errorFeedback).toBeVisible();

    await emailField.fill('example@mail.com');
    await emailField.blur(); // Триггерим валидацию
    await expect(errorFeedback).toBeHidden();
  });
});

test.describe('Fill specific types of fields', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  // Тест 1: Заполнение textarea
  // 1. Найти textarea по label
  // 2. Заполнить многострочным текстом
  // 3. Проверить что текст сохранен полностью
  test('Fill multi-line textarea', async ({ page }) => {
    const bioField = page.getByLabel('Краткая биография');
    const longText = 'Меня зовут Иван.\nЯ работаю тестировщиком.\nЛюблю автоматизацию.';

    await bioField.fill(longText);
    await expect(bioField).toHaveValue(longText);
  });

  // Тест 2: Заполнение числового поля
  // 1. Найти поле возраста по label
  // 2. Заполнить числовым значением
  // 3. Проверить что значение установлено
  // 4. Проверить что не-числовые значения не принимаются
  test('Fill number field', async ({ page }) => {
    const ageField = page.getByLabel('Возраст');

    await ageField.fill('30');
    await expect(ageField).toHaveValue('30');
  });
});

test.describe('Validation and complex filling scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  // Тест 1: Заполнение с проверкой паттерна
  // 1. Найти поле телефона по label
  // 2. Заполнить невалидным значением (меньше 10 цифр)
  // 3. Проверить сообщение об ошибке
  // 4. Заполнить валидным номером
  // 5. Проверить исчезновение ошибки
  test('Phone validation by pattern', async ({ page }) => {
    const phoneField = page.getByLabel('Телефон');
    const errorFeedback = page.getByText('Требуется 10 цифр');

    await phoneField.fill('123456');
    await expect(errorFeedback).toBeVisible();

    await phoneField.fill('1234567890');
    await expect(errorFeedback).toBeHidden();
  });

  // Тест 2: Постепенное заполнение с clear()
  // 1. Найти поле кредитной карты по label
  // 2. Заполнить частично
  // 3. Очистить поле
  // 4. Заполнить полностью
  test('Gradual filling with cleaning', async ({ page }) => {
    const cardField = page.getByLabel('Кредитная карта');

    await cardField.fill('1234');
    await expect(cardField).toHaveValue('1234');

    await cardField.clear();
    await expect(cardField).toHaveValue('');

    await cardField.fill('1234 5678 9012 3456');
    await expect(cardField).toHaveValue('1234 5678 9012 3456');
  });
});
