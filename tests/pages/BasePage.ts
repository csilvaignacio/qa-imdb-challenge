import { Page } from '@playwright/test';

export abstract class BasePage{

    constructor(protected page: Page){}

    abstract waitForVisible(): Promise <void>;

    async waitForIdle(): Promise<void>{
        await this.page.waitForLoadState('domcontentloaded');
    }

    async goto(url: string = ''): Promise<void>{
        await Promise.all([
            this.page.goto(url),
            this.waitForVisible(),
        ])
    }

}