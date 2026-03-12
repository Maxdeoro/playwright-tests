import { test, expect } from '@playwright/test';

// Тесты для формы входа
test.describe('Parametrized tests for login form', () => {
  const loginTestCases = [
    {
      username: 'admin',
      password: 'admin123',
      expected: 'Успешный вход!',
    },
    {
      username: '',
      password: 'anypassword',
      expected: 'Все поля обязательны',
    },
    {
      username: 'testuser',
      password: '123',
      expected: 'Пароль должен быть не менее 6 символов',
    },
  ];

  // Нужно реализовать параметризованный тест на основе массива loginTestCases
  // Шаги теста:
  // 1. Перейти на страницу формы входа
  // 2. Заполнить поле имени пользователя (если не пустое)
  // 3. Заполнить поле пароля
  // 4. Нажать кнопку "Войти"
  // 5. Проверить сообщение системы
  // 6. Проверить класс сообщения (success/error)
  loginTestCases.forEach(({username,password,expected}) => {
    test(`Login test: ${username} || 'empty'/${password}-${expected}`, async ({page}) => {
      await page.goto('https://osstep.github.io/parametrize');

      await test.step('Fill login form', async () => {
        if(username) {
          await page.locator('#username').fill(username);
        }
        await page.getByRole('textbox', {name: 'Пароль'}).fill(password);
      });

      await test.step('Send form', async () => {
        // await page.click('#login-btn');
        await page.getByRole('button', {name: 'Войти'}).click();
      });

      await test.step('Check message', async () => {
        const msg = page.locator('#message');
        await expect.soft(msg).toBeVisible();
        await expect.soft(msg).toHaveText(expected);

        const expectedClass = expected === 'Успешный вход!' ? 'success' : 'error';
        await expect(msg).toHaveClass(new RegExp(expectedClass));
      });
    });
  });
});

// Тесты для калькулятора
test.describe('Параметризованные тесты калькулятора', () => {
  const calculatorTestCases = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 10, b: 0, operation: 'add', expected: 10 },
    { a: 4, b: 5, operation: 'multiply', expected: 20 },
  ];
  // Нужно реализовать параметризованный тест на основе массива calculatorTestCases
  // Шаги теста:
  // 1. Перейти на страницу калькулятора
  // 2. Ввести первое число
  // 3. Ввести второе число
  // 4. Нажать кнопку операции (сложение/умножение)
  // 5. Проверить результат вычисления
});
