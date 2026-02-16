import { test, expect } from '@playwright/test';

test.describe('Testing with toBeVisible()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/assertion_tobevisible');
  });

  test('Test of element visibility', async ({ page }) => {
    // Задание 1: Проверка видимости элемента
    // 1. Найти элемент с id "always-visible"
    // 2. Проверить что элемент видим с помощью toBeVisible()
    // 3. Проверить что элемент содержит текст "Всегда видимый элемент"
    const elem = page.locator('#always-visible');
    await expect(elem).toBeVisible();
  });

  test('Test elements with different types of hiding', async ({ page }) => {
    // Задание 2: Проверка скрытых элементов
    // 1. Найти три элемента с разными способами скрытия:
    //    - #toggle-display (display: none)
    //    - #toggle-visibility (visibility: hidden)
    //    - #toggle-opacity (opacity: 0)
    // 2. Проверить что #toggle-display и #toggle-visibility не видны с помощью not.toBeVisible()
    // 3. Проверить что #toggle-opacity виден с помощью toBeVisible()
    const display = page.locator('#toggle-display');
    const visibility = page.locator('#toggle-visibility');
    const opacity = page.locator('#toggle-opacity');

    await expect(display).not.toBeVisible();
    await expect(visibility).not.toBeVisible();
    await expect(opacity).toBeVisible();
  });

  test('Тест изменения видимости элементов', async ({ page }) => {
    // Задание 3: Проверка изменения видимости
    // 1. Найти три кнопки для показа элементов:
    //    - #show-display
    //    - #show-visibility
    //    - #show-opacity
    // 2. Кликнуть по каждой кнопке
    // 3. После каждого клика проверить:
    //    - что соответствующий элемент стал видимым (toBeVisible())
    //    - что CSS свойства изменились на:
    //      - display: block
    //      - visibility: visible
    //      - opacity: 1
    const btn1 = page.locator('#show-display');
    const btn2 = page.locator('#show-visibility');
    const btn3 = page.locator('#show-opacity');

    await btn1.click();
    await btn2.click();
    await btn3.click();

    await expect(btn1).toBeVisible();
    await expect(btn2).toBeVisible();
    await expect(btn3).toBeVisible();

    await expect(btn1).toHaveCSS('display', 'inline-block');
    await expect(btn2).toHaveCSS('visibility', 'visible');
    await expect(btn3).toHaveCSS('opacity', '1');
  });

  test('Test element with delayed appearance', async ({ page }) => {
    // Задание 4: Проверка элемента с задержкой
    // 1. Найти элемент #delayed-element
    // 2. Проверить что он не видим
    // 3. Найти кнопку #show-delayed и кликнуть по ней
    // 4. С таймаутом 3 секунды дождаться появления элемента
    // 5. Проверить что элемент содержит текст "Элемент с задержкой появления"
    const delayedElement = page.locator('#delayed-element');
    await expect(delayedElement).not.toBeVisible();

    const showDelayed = page.locator('#show-delayed');
    await showDelayed.click();
    await expect(delayedElement).toHaveText('Элемент с задержкой появления');
  });
});
