import { FilterComponent } from "../components/FilterComponent";
import { BasePage } from "./BasePage";
import { expect, Page } from "@playwright/test"

export class GalleryPage extends BasePage {

    private readonly imagenSection = this.page.locator('section[data-testid="sub-section-images"]');
    private readonly galleryContainer = this.page.getByTestId('section-images');
    readonly filterComponent = new FilterComponent(this.page);
   

    constructor(page: Page) {
        super(page);
    }

    async waitForVisible(){
        await expect(this.galleryContainer).toBeVisible();
    }

    async selectImageFromList(imageNumber: number){
        const value = this.imagenSection.locator('a').nth(imageNumber);
        await value.click();
    } 

    
}