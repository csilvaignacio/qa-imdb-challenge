import { MenuComponent } from '../components/MenuComponent';
import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';

export class IMDHomePage extends BasePage {

    private readonly featuredSection = this.page.getByRole('heading', { name: 'Featured today' });
    readonly menuComponent = new MenuComponent(this.page);

    constructor(page: Page) {
        super(page)
    }

    async waitForVisible(): Promise<void> {
        await this.waitForIdle()
        await expect(this.featuredSection).toBeVisible();
    }
    
}
