import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('Testing the initial values of fields', async ({ page }) => {
  // Задание: Проверить начальные значения всех полей формы
  // 1. Найти поле "Имя пользователя" по лейблу и проверить значение "Гость"
  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  // 3. Найти поле "Телефон" и проверить значение "+7"
  // 4. Найти поле "Комментарии" и проверить что оно пустое
  // 5. Найти выпадающий список "Страна" и проверить значение "ru"
  const userName = page.getByLabel('Имя пользователя');
  await expect(userName).toHaveValue('Гость');
  const email = page.getByLabel('Электронная почта');
  await expect(email).toHaveValue('');
  const phone = page.getByLabel('Телефон');
  await expect(phone).toHaveValue('+7');
  const comments = page.getByLabel('Комментарии');
  await expect(comments).toHaveValue('');
  const country = page.getByLabel('Страна');
  await expect(country).toHaveValue('ru');
});

test('Test changes to fields values', async ({ page }) => {
  // Задание: Проверить обновление значений полей
  // 1. Заполнить поле "Имя пользователя" значением "Алексей"
  // 2. Заполнить поле "Электронная почта" значением "alex@example.com"
  // 3. Заполнить поле "Телефон" значением "+7 (123) 456-78-90"
  // 4. Заполнить поле "Комментарии" значением "Тестовый комментарий"
  // 5. Выбрать в списке "Страна" значение "Казахстан" (kz)
  // 6. Проверить что все поля содержат новые значения
  const userName = page.getByLabel('Имя пользователя');
  await userName.fill('Max');
  await expect(userName).toHaveValue('Max');
  const email = page.getByLabel('Электронная почта');
  await email.fill('max@example.com');
  await expect(email).toHaveValue('max@example.com');
  const phone = page.getByLabel('Телефон');
  await phone.fill('+7 (123) 456-78-90');
  await expect(phone).toHaveValue('+7 (123) 456-78-90');
  const comments = page.getByLabel('Комментарии');
  await comments.fill('Тестовый комментарий');
  await expect(comments).toHaveValue('Тестовый комментарий');
  const country = page.getByLabel('Страна');
  await country.selectOption('kz');
  await expect(country).toHaveValue('kz');
});

test('Testing of the form reset', async ({ page }) => {
  // Задание: Проверить сброс значений формы к начальным
  // 1. Изменить поле "Имя пользователя" на "Петр"
  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  // 4. Нажать кнопку "Сбросить"
  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  // 6. Проверить что поле "Электронная почта" пустое
  // 7. Проверить что поле "Телефон" содержит "+7"
  // 8. Проверить что список "Страна" содержит значение "ru"
  const userName = page.getByLabel('Имя пользователя');
  await userName.fill('Sebastian');
  const email = page.getByLabel('Электронная почта');
  await email.fill('test@test.ru');
  const country = page.getByLabel('Страна');
  await country.selectOption('by');
  const phone = page.getByLabel('Телефон');
  await phone.fill('+7 (123) 456-78-99');

  const resetBtn = page.locator('#reset-btn');
  await resetBtn.click();
  
  await expect(userName).toHaveValue('Гость');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('+7');
  await expect(country).toHaveValue('ru');
});

test('Testing of data update', async ({ page }) => {
  // Задание: Проверить отображение введенных данных
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  // 4. Нажать кнопку "Обновить данные"
  // 5. Проверить что в блоке вывода содержится текст с введенными данными
  const userName = page.getByLabel('Имя пользователя');
  await userName.fill('Mary');
  const email = page.getByLabel('Электронная почта');
  await email.fill('mary@example.com');
  const comments = page.getByLabel('Комментарии');
  await comments.fill('Important comment');

  const updateBtn = page.locator('#update-btn');
  await updateBtn.click();

  await expect(userName).toHaveValue('Mary');
  await expect(email).toHaveValue('mary@example.com');
  await expect(comments).toHaveValue('Important comment');
});

test('Testing empty values', async ({ page }) => {
  // Задание: Проверить обработку пустых значений
  // 1. Очистить поле "Имя пользователя"
  // 2. Очистить поле "Телефон"
  // 3. Выбрать пустое значение в списке "Страна"
  // 4. Проверить что поле "Имя пользователя" пустое
  // 5. Проверить что поле "Телефон" пустое
  // 6. Проверить что список "Страна" содержит пустое значение
  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым
  const userName = page.getByLabel('Имя пользователя');
  await userName.clear();
  const phone = page.getByLabel('Телефон');
  await phone.clear();
  const country = page.getByLabel('Страна');
  await country.selectOption('');
  const email = page.getByLabel('Электронная почта');

  await expect(userName).toHaveValue('');
  await expect(phone).toHaveValue('');
  await expect(country).toHaveValue('');
  await expect(email).toHaveValue('');
});
