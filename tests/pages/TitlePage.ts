import { MediaviewerComponent } from "../components/MediaviewerComponent";
import { BasePage } from "./BasePage";
import { Page, expect } from '@playwright/test'; // <-- Asegúrate de importar expect

export class TitlePage extends BasePage {
    private readonly btnRate = this.page.getByTestId('hero-parent').getByRole('button', { name: /Rate|Calificar/i });
    readonly titleName = this.page.getByTestId('hero__primary-text')
    readonly mediaViewer = new MediaviewerComponent(this.page);

    constructor(page: Page){
        super(page)
    }

    async waitForVisible(): Promise<void> {
        await expect(this.btnRate).toBeVisible();
    }

    async clickBtnRate(): Promise<void>{
        await expect(async () => {
        await this.btnRate.click();
        await expect(this.page.locator('.ipc-rating-prompt__rate-button')).toBeVisible();
    }).toPass({ timeout: 20000 });}

    async selectRating(star: number): Promise<void> {
        const starButton = this.page.getByRole('button', { name: `Rate ${star}` });
        await starButton.focus();
        await this.page.keyboard.press('Enter');
        const submitRateButton = this.page.getByRole('button', { name: 'Rate', exact: true }); 
        await submitRateButton.click();
    }

    async clickMediaTab(mediaTabName: string){
        const mediaCard = this.page.locator(`div a[data-testid=hero__${mediaTabName}-link]`)
        await mediaCard.click();
    }


}