import { BasePage } from "../pages/BasePage";
import { Page , expect } from '@playwright/test';

export class MenuComponent extends BasePage{
    
    private readonly searchInput = this.page.getByPlaceholder('Search IMDb');
    private readonly menuBtn = this.page.getByLabel('Open navigation drawer');

    constructor(page: Page){
        super(page)
    }
    

    async waitForVisible(): Promise<void> {
        await expect(this.menuBtn).toBeVisible()
    }

    async search(name: string): Promise<void>{
        await this.searchInput.fill(name);
        const firstResult = this.page
            .locator('ul li[role=option]')
            .first();
        await expect(firstResult).toBeVisible();
        await firstResult.click();
        
    }

    async openMenu(): Promise<void> {
        await this.menuBtn.click();
    }

    async goToOption(option: string): Promise<void> {
        await this.page.locator('a span',{hasText:`${option}`}).click();
    }
}