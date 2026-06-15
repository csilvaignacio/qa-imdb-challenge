import { test } from '@playwright/test';
import { IMDHomePage } from '../pages/IMDHomePage';
import { AdvancedSearchPage } from '../pages/AdvancedSearchPage';

test('buscar celebridades nacidas ayer y hacer screenshot del 3er resultado', async ({ page }) => {

    const home = new IMDHomePage(page);
    await home.goto('/');
    await home.waitForVisible();
    await home.menuComponent.openMenu();
    await home.menuComponent.goToOption('Born today');

    const advSearch = new AdvancedSearchPage(page);
    await advSearch.waitForVisible();
    await advSearch.removeDefaultBirthday();
    await advSearch.expandBirthdayAccordion();
    await advSearch.setYesterdayAndSearch();
    await advSearch.clickNameByIndex(3);
    await page.screenshot({ path: 'test-results/evidencia-TC04.png' });

    
});