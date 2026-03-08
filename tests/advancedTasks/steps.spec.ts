import { test, expect } from '@playwright/test';

test.describe('Тестирование формы регистрации', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/steps');
  });

  test('Full test of the registration form', async ({ page }) => {
    // Тест проверяет полный цикл работы с формой:
    // 1. Начальное состояние
    // 2. Негативные сценарии
    // 3. Успешную регистрацию
    // 4. Проверку профиля
    // 5. Выход из системы

    // Создай test.step ПРЕДУСЛОВИЯ: Проверить начальное состояние формы
    // В рамках шага выполни проверки
    // Что проверяем:
    // - Все поля формы пустые
    // - Сообщения об ошибке и успехе скрыты
    // - Секция профиля не отображается

    await test.step('Check initial form state', async () => {
      await expect(page.locator('#username')).toBeEmpty();
      await expect(page.locator('#email')).toBeEmpty();
      await expect(page.locator('#password')).toBeEmpty();
      await expect(page.locator('#success-message')).toBeHidden();
      await expect(page.locator('#profile-section')).toBeHidden();
    });

    // Создай test.step ШАГ 1: Попытка регистрации с пустыми полями
    // В рамках шага выполни проверки
    // Что выполняем:
    // - Нажимаем кнопку без заполнения полей
    // Что проверяем:
    // - Появилось сообщение о необходимости заполнить все поля
    // - Сообщение об успехе осталось скрытым

    await test.step('test registration with empty fields', async () => {
      await page.getByRole('button', {name: 'Зарегистрироваться'}).click();
      await expect(page.locator('#error-message')).toBeVisible();
      await expect(page.locator('#success-message')).toBeHidden();
    });

    // Создай test.step ШАГ 2: Попытка регистрации с некорректными данными
    // В рамках шага выполни проверки
    // Что выполняем:
    // - Заполняем имя пользователя
    // - Вводим email без @
    // - Вводим слишком короткий пароль
    // Что проверяем:
    // - Соответствующие сообщения об ошибках

    await test.step('test registration with incorrect datas', async () => {
      await page.locator('#username').fill('Max');
      await page.locator('#email').fill('examplemail.com');
      await page.locator('#password').fill('12');
      await page.getByRole('button', {name: 'Зарегистрироваться'}).click();
      await expect(page.locator('.error')).toBeVisible();
      await expect(page.locator('.error')).toHaveText('Пароль должен быть не менее 6 символов');
    });

    // Создай test.step ШАГ 3: Успешная регистрация
    // В рамках шага выполни проверки
    // Что выполняем:
    // - Заполняем все поля корректными данными
    // Что проверяем:
    // - Исчезло сообщение об ошибке
    // - Появилось сообщение об успехе
    // - Отобразилась секция профиля

    await test.step('test succeful registration', async () => {
      await page.locator('#username').fill('John');
      await page.locator('#email').fill('john@snow.me');
      await page.locator('#password').fill('123456');
      await page.getByRole('button', {name: 'Зарегистрироваться'}).click();
      await expect(page.locator('.error')).toBeHidden();
      await expect(page.locator('#success-message')).toBeVisible();
      await expect(page.locator('#profile-section')).toBeVisible();
    });

    // Создай test.step ШАГ 4: Проверка данных профиля
    // В рамках шага выполни проверки
    // Что проверяем:
    // - Данные в профиле соответствуют введенным при регистрации

    await test.step('check profile data', async () => {
      await expect(page.locator('#profile-username')).toHaveText('John');
      await expect(page.locator('#profile-email')).toHaveText('john@snow.me');
    });

    // Создай test.step ШАГ 5: Выход из системы
    // В рамках шага выполни проверки
    // Что выполняем:
    // - Нажимаем кнопку выхода
    // Что проверяем:
    // - Форма регистрации сброшена
    // - Секция профиля скрыта
    await test.step('test logout', async () => {
      await page.getByRole('button', {name: 'Выйти'}).click();
      await expect(page.locator('#username')).toBeEmpty();
      await expect(page.locator('#email')).toBeEmpty();
      await expect(page.locator('#password')).toBeEmpty();
      await expect(page.locator('#profile-section')).toBeHidden();
    });
  });

  // Демонстрационный тест
  test.describe('Параметризованные тесты регистрации', () => {
    const testCases = [
      {
        title: 'Короткий пароль (5 символов)',
        data: { username: 'user1', email: 'user1@test.com', password: '12345' },
        expectedError: 'Пароль должен быть не менее 6 символов',
      },
    ];

    for (const testCase of testCases) {
      test(testCase.title, async ({ page }) => {
        await test.step('ЗАПОЛНЕНИЕ: Ввести тестовые данные', async () => {
          await page.locator('#username').fill(testCase.data.username);
          await page.locator('#email').fill(testCase.data.email);
          await page.locator('#password').fill(testCase.data.password);
        });

        await test.step('ДЕЙСТВИЕ: Отправить форму', async () => {
          await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        });

        await test.step('ПРОВЕРКА: Сообщение об ошибке', async () => {
          await expect(page.locator('#error-message')).toBeVisible();
          await expect(page.locator('#error-message')).toContainText(testCase.expectedError);
        });
      });
    }
  });

  // Демонстрационный тест
  test('Вложенные шаги с группами проверок', async ({ page }) => {
    await test.step('ГРУППА: Проверки валидации формы', async () => {
      await test.step('ПУСТЫЕ ПОЛЯ: Отправка пустой формы', async () => {
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#error-message')).toHaveText(/Все поля обязательны/);
      });

      await test.step('ЧАСТИЧНО ЗАПОЛНЕННАЯ: Только имя пользователя', async () => {
        await page.locator('#username').fill('partialuser');
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#error-message')).toHaveText(/Все поля обязательны/);
      });
    });

    await test.step('ГРУППА: Проверки успешных сценариев', async () => {
      await test.step('КОРРЕКТНЫЕ ДАННЫЕ: Полное заполнение формы', async () => {
        await page.locator('#username').fill('validuser');
        await page.locator('#email').fill('valid@example.com');
        await page.locator('#password').fill('validpassword123');
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#success-message')).toBeVisible();
      });
    });
  });
});
