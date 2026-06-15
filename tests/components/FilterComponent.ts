import { BasePage } from "../pages/BasePage"
import { Page , expect } from "@playwright/test"

export class FilterComponent extends BasePage{
    private readonly filterButton = this.page.getByRole('button', { name: 'Open filter prompt' });
    private readonly closeFilterButton = this.page.getByTestId('promptable__x').getByRole('button');
    private readonly personSelect = this.page.locator('select[name="Person-filter-select-dropdown"]');

    constructor(page: Page){
        super(page);
    }

    async waitForVisible(): Promise<void> {
        await expect(this.filterButton).toBeEnabled();
    }

    async openFilter(){
        await expect(async () => {
            await this.filterButton.scrollIntoViewIfNeeded();
            await this.filterButton.click();
            await expect(this.personSelect).toBeVisible(); 
        }).toPass({ timeout: 20000 });
    }

    async closeFilter(){
        await this.closeFilterButton.dblclick();
    }

    async filterByPerson(name: string){
        const value = await this.personSelect
            .locator(`option:has-text("${name}")`)
            .getAttribute('value');
        await this.personSelect.selectOption({ value: value! });
    }

    
}