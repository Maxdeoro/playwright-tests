import { test, expect, Locator } from '@playwright/test';

test.describe('Working with general select elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });

  // Тест 1: Выбор одиночной опции по значению
  // 1. Найти select "Страна" по label
  // 2. Проверить что ничего не выбрано
  // 3. Выбрать опцию "США" по значению 'us'
  // 4. Проверить что выбор зарегистрирован
  // 5. Проверить текст фидбэка
  test('Pick country by value', async ({ page }) => {
    const countrySelect = page.getByLabel('Страна');
    await expect(countrySelect).toHaveValue('');

    await countrySelect.selectOption('us');
    await expect(countrySelect).toHaveValue('us');
    await expect(page.locator('#country-feedback')).toHaveText('Выбрано: США');
  });

  // Тест 2: Выбор одиночной опции по тексту
  // 1. Найти select "Страна"
  // 2. Выбрать опцию "Германия" по тексту
  // 3. Проверить значение и фидбэк
  test('Pick country by text', async ({ page }) => {
    const countrySelect = page.getByLabel('Страна');
    await countrySelect.selectOption({label: 'Германия'});

    await expect(countrySelect).toHaveValue('de');
    await expect(page.locator('#country-feedback')).toHaveText('Выбрано: Германия');
  });
});

test.describe('Working with select multiple', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });
  // Хелпер для получения всех выбранных значений без evaluate
  const getSelectedValues = async (locator: Locator) => {
    const checkedOptions = await locator.locator('option:checked').all();
    return Promise.all(checkedOptions.map((option) => option.getAttribute('value')));
  };
  // Тест 1: Выбор нескольких опций по значению
  // 1. Найти multiple select "Языки программирования"
  // 2. Выбрать JavaScript и Python по значениям
  // 3. Проверить что выбраны только эти опции
  // 4. Проверить фидбэк
  test('Multiple selection by value', async ({ page }) => {
    const languagesSelect = page.getByLabel('Языки программирования');

    await languagesSelect.selectOption(['js', 'py']);

    const selectedOptions = await getSelectedValues(languagesSelect);
    expect(selectedOptions).toEqual(['js', 'py']);
    await expect(page.locator('#languages-feedback')).toHaveText('Выбрано: JavaScript, Python');
  });
});

test.describe('Advanced scenarios with selectOptions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });

  // Тест 1: Выбор из группированных опций
  // 1. Найти select "Марка автомобиля"
  // 2. Выбрать Toyota из группы "Японские"
  // 3. Проверить значение
  test('Selection from grouped options', async ({ page }) => {
    const carBrandSelect = page.getByLabel('Марка автомобиля');

    await carBrandSelect.selectOption('honda');

    await expect(carBrandSelect).toHaveValue('honda');
  });

  // Тест 2: Работа с динамически добавленными select
  // 1. Дождаться появления динамического select
  // 2. Выбрать опцию по тексту
  // 3. Проверить значение
  test('Dynamically added select', async ({ page }) => {
    const dynamicSelect = page.getByLabel('Динамический select');
    await expect(dynamicSelect).toBeVisible({ timeout: 2000 });

    await dynamicSelect.selectOption('Опция 2');
    await expect(dynamicSelect).toHaveValue('opt2');
  });
});
