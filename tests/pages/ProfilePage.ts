import { BasePage } from "./BasePage";
import { Page, expect } from '@playwright/test';

export class ProfilePage extends BasePage {
   
    readonly profileName = this.page.getByTestId('hero__primary-text');
  

    constructor(page: Page){
        super(page);
    }

    async waitForVisible(): Promise<void> {
        await expect(this.profileName).toBeVisible();
    }


    async expandUpcoming(): Promise<void> {
        const upcomingBtn = this.page.getByRole('button', { name: 'Expand Upcoming' }).first();
        await upcomingBtn.click();
        await this.page
            .getByRole('button', { name: 'Collapse Upcoming' })
            .first()
            .waitFor({ state: 'visible' });
    }

    async clickFirstCompletedMovie(): Promise<void> {
        await this.page
            .locator('li.ipc-metadata-list-summary-item')
            .filter({ hasText: 'Completed' })
            .first()
            .getByRole('link')
            .first()
            .click();
    }
    
}