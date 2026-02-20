import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveattribute');
});

test('Testing attributes of the main button', async ({ page }) => {
  // Задание: Проверить атрибуты основной кнопки
  // 1. Найти кнопку "Отправить" по тексту
  // 2. Проверить что она имеет атрибут data-action="submit"
  // 3. Проверить что она имеет атрибут title="Основная кнопка"
  // 4. Нажать кнопку "Переключить атрибуты"
  // 5. Проверить что атрибут data-action изменился на "cancel"
  // 6. Проверить что атрибут title изменился на "Отмена действия"
  const mainBtn = page.getByText('Отправить');
  await expect(mainBtn).toHaveAttribute('data-action', 'submit');
  await expect(mainBtn).toHaveAttribute('title', 'Основная кнопка');
  const toggleBtn = page.locator('#toggle-btn');
  await toggleBtn.click();
  await expect(mainBtn).toHaveAttribute('data-action', 'cancel');
  await expect(mainBtn).toHaveAttribute('title', 'Отмена действия');
});

test('Test if the button is disabled', async ({ page }) => {
  // Задание: Проверить изменение состояния кнопки
  // 1. Найти кнопку "Отправить" и проверить что у нее нет атрибута disabled
  // 2. Нажать кнопку "Отключить кнопку"
  // 3. Проверить что кнопка "Отправить" получила атрибут disabled
  // 4. Проверить что значение атрибута disabled равно пустой строке
  // 5. Еще раз нажать "Отключить кнопку"
  // 6. Проверить что атрибут disabled отсутствует
  const mainBtn = page.locator('#main-btn');
  await expect(mainBtn).not.toHaveAttribute('disabled');
  await page.locator('#disable-btn').click();
  await expect(mainBtn).toHaveAttribute('disabled', '');
  await page.locator('#disable-btn').click();
  await expect(mainBtn).not.toHaveAttribute('disabled');
});

test('Testing attributes of image', async ({ page }) => {
  // Задание: Проверить атрибуты изображения
  // 1. Найти изображение по атрибуту alt
  // 2. Проверить что оно имеет src="user.jpg"
  // 3. Проверить что оно имеет alt="Аватар пользователя"
  // 4. Проверить что оно имеет width="200"
  const img = page.getByAltText('Аватар пользователя');
  await expect(img).toHaveAttribute('src', 'user.jpg');
  await expect(img).toHaveAttribute('alt', 'Аватар пользователя');
  await expect(img).toHaveAttribute('width', '200');
});

test('Testing form attributes', async ({ page }) => {
  // Задание: Проверить атрибуты полей формы
  // 1. Найти поле "Имя пользователя" и проверить:
  //    - имеет атрибут required
  //    - имеет атрибут minlength="3"
  // 2. Найти поле "Email" и проверить что оно имеет атрибут disabled
  // 3. Нажать кнопку "Активировать email"
  // 4. Проверить что поле "Email" больше не имеет атрибута disabled
  // 5. Проверить что placeholder изменился на "Введите ваш email"
  const userName = page.getByPlaceholder('Имя пользователя');
  await expect(userName).toHaveAttribute('required');
  await expect(userName).toHaveAttribute('minlength', '3');
  const email = page.getByPlaceholder('Email');
  await expect(email).toHaveAttribute('disabled');
  const enableBtn = page.getByText('Активировать email');
  await enableBtn.click();
  await expect(email).not.toHaveAttribute('disabled');
  await expect(email).toHaveAttribute('placeholder', 'Введите ваш email');
});

test('Data-attributes testing', async ({ page }) => {
  // Задание: Проверить data-атрибуты контейнера
  // 1. Найти контейнер по тексту
  // 2. Проверить что он имеет:
  //    - data-role="container"
  //    - data-visible="true"
  //    - data-user-id="12345"
  // 3. Нажать кнопку "Обновить data-атрибуты"
  // 4. Проверить что data-visible изменился на "false"
  // 5. Проверить что data-user-id изменился (не равен "12345")
  // 6. Еще раз нажать кнопку
  // 7. Проверить что data-visible снова "true"
  const container = page.getByText('Контейнер с data-атрибутами');
  await expect(container).toHaveAttribute('data-role', 'container');
  await expect(container).toHaveAttribute('data-visible', 'true');
  await expect(container).toHaveAttribute('data-user-id', '12345');
  await page.locator('#update-data').click();
  await expect(container).toHaveAttribute('data-visible', 'false');
  await expect(container).not.toHaveAttribute('data-user-id', '12345');
  await page.locator('#update-data').click();
  await expect(container).toHaveAttribute('data-visible', 'true');
});
