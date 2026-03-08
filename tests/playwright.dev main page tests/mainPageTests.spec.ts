import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
};

const elements: Elements[] = [
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('heading', {name: 'Playwright enables reliable'}),
    name: 'Heading',
    text: 'Playwright enables reliable end-to-end testing for modern web apps.',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', {name: 'Get started'}),
    name: 'Button',
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  }
];

test.describe('tests main page', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('https://playwright.dev', { timeout: 70000 });
  });

  test('test visibility of the navigation elements', async ({ page }) => {
    elements.forEach(({locator, name}) => {
      test.step(`test visibility of the ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('test button Get started', async ({ page }) => {
    elements.forEach(({locator,name,text,attribute}) => {
      test.step(`test visibility of the ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
      if (text) {
        test.step(`test text on the ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
      if (attribute) {
        test.step(`test href of the ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test('test href attributs', async ({ page }) => {
    elements.forEach(({locator,name,attribute}) => {
      if (attribute) {
        test.step(`test href attribut of the ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute(attribute.type,attribute.value);
        });
      }
    });
  });

  test('test visibility and content of the page heading', async ({ page }) => {
    elements.forEach(({locator,name,text}) => {
      test.step(`test visibility of the heading ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
      if (text) {
        test.step(`test content of the ${name}`, async () => { 
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('test correct names of the elements', async ({ page }) => {
    elements.forEach(({locator, name, text}) => {
      if(text) {
        test.step(`test correct names of ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });
});
