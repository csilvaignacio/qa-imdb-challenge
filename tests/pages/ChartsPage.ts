import { BasePage } from "./BasePage"
import { Page, expect } from '@playwright/test'

export class ChartsPage extends BasePage{

    readonly chartName = this.page.locator('h1');
    private readonly movieList = this.page.locator('ul li a.ipc-title-link-wrapper');

    constructor(page: Page){
        super(page)
    }

    async waitForVisible(): Promise<void> {
        await expect(this.chartName).toBeVisible();
    }

    async selectByItemNumber(numElement: number){
        const targetMovie = this.movieList.nth(numElement);
        await targetMovie.locator('h4').click({ force: true });
    }

    async selectByName(nameElement: string){
        const nameMovie = this.page.getByRole('heading', { name: `${nameElement}` });
        await nameMovie.click();
    }


}