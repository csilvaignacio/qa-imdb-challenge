import { BasePage } from "../pages/BasePage";
import { Page, expect } from '@playwright/test';

export class MediaviewerComponent extends BasePage{

    private readonly actionBar = this.page.locator('div[data-testid="action-bar"]')
    private readonly containerMediaviewer = this.page.locator('div[data-testid="media-viewer"]');

    constructor(page: Page){
        super(page);
    }

    async waitForVisible(): Promise<void> {
        await expect(this.actionBar).toBeVisible();
        await expect(this.containerMediaviewer).toBeVisible();
    }

    async openGallery(){
        await this.actionBar.locator('a[data-testid=mv-gallery-button]').click();
    }

}