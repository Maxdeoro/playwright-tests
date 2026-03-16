import test, { Page, Locator, expect } from "playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
};

export class MainPage {
    readonly page: Page;
    readonly elements: Elements[];

    constructor(page: Page) {
        this.page = page;
        this.elements = [
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
    };

    async openMainPage() {
        await this.page.goto('https://playwright.dev', {timeout: 50000});
    };

    async checkElementsVisibility() {
        // this.elements.forEach(({locator,name}) => {
        for(const {locator,name} of this.elements) {
            test.step(`Check visibility of the element ${name}`, async () => {
                await expect.soft(locator(this.page)).toBeVisible();
            });
        };
    };
};