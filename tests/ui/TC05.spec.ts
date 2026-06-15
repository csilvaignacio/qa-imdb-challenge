import { test } from '@playwright/test';
import { IMDHomePage } from '../pages/IMDHomePage';
import { AdvancedSearchPage } from '../pages/AdvancedSearchPage';

test.only('buscar celebridades nacidas hace exactamente 40 años y screenshot', async ({ page }) => {

    const home = new IMDHomePage(page);
    await home.goto('/');
    await home.waitForVisible();
    await home.menuComponent.openMenu();
    await home.menuComponent.goToOption('Born today');

    const advSearch = new AdvancedSearchPage(page);
    await advSearch.waitForVisible();
    await advSearch.removeDefaultBirthday();
    await advSearch.expandBirthDateAccordion();
    await advSearch.setBirthDate40YearsAgoAndSearch();
    await advSearch.clickFirstLinkInFirstResult();
    await page.screenshot({ path: 'test-results/evidencia-TC05.png' });
});