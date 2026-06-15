import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";

export class AdvancedSearchPage extends BasePage {

    private readonly activeBirthday = this.page.locator('[data-testid^="selected-input-chip-list-birthday-"]');
    private readonly birthdayAccordionBtn = this.page.getByRole('button', { name: 'Birthday' });
    private readonly birthdayInput = this.page.getByTestId('birthday-input-test-id');
    private readonly resultsButton = this.page.getByTestId('adv-search-get-results');
    private readonly nameResults = this.page.locator('li.ipc-metadata-list-summary-item');

    private readonly birthDateAccordionBtn = this.page.getByRole('button', { name: 'Birth date' });
    private readonly birthDateFromPicker = this.page.getByTestId('birthDate-start');
    private readonly birthDateToText = this.page.getByTestId('birthYearMonth-end');

    constructor(page: Page) {
        super(page);
    }

    async waitForVisible(): Promise<void> {
        await expect(this.activeBirthday).toBeVisible();
    }

    private getYesterdayMMDD(): string {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
        const dd = String(yesterday.getDate()).padStart(2, '0');
        return `${mm}-${dd}`;
    }

    async removeDefaultBirthday(): Promise<void> {
        await this.activeBirthday.locator('svg').click();
        await expect(this.activeBirthday).not.toBeVisible();
    }

    async expandBirthdayAccordion(): Promise<void> {
        await this.birthdayAccordionBtn.click();
        await expect(this.birthdayInput).toBeVisible();
    }

    async setYesterdayAndSearch(): Promise<void> {
        const yesterday = this.getYesterdayMMDD();
        await this.birthdayInput.pressSequentially(yesterday, { delay: 50 });
        await expect(this.birthdayInput).toHaveValue(yesterday);
        await this.birthdayInput.press('Tab'); 
        await expect(this.resultsButton).toBeEnabled();
        await this.resultsButton.click();
        await expect(this.nameResults.first()).toBeVisible();
    }

    async clickNameByIndex(index: number): Promise<void> {
        await this.nameResults.nth(index - 1).locator('[data-testid="nlib-title"] a').click();
    }

    private getTodayMinus40Years(): { full: string; yearMonth: string } {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 40);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return {
            full: `${yyyy}-${mm}-${dd}`,   
            yearMonth: `${yyyy}-${mm}`     
        };
    }

    async expandBirthDateAccordion(): Promise<void> {
        await this.birthDateAccordionBtn.click();
        await expect(this.birthDateFromPicker).toBeVisible();
    }

    async setBirthDate40YearsAgoAndSearch(): Promise<void> {
        const date = this.getTodayMinus40Years();
        await this.birthDateFromPicker.fill(date.full);
        await this.birthDateToText.fill(date.yearMonth);
        await this.birthDateToText.press('Tab');
        await expect(this.resultsButton).toBeEnabled();
        await this.resultsButton.click();
        await expect(this.nameResults.first()).toBeVisible();
    }

    async clickFirstLinkInFirstResult(): Promise<void> {
        const firstResult = this.nameResults.first();
        await firstResult.locator('a.ipc-md-link').first().click();
    }

}