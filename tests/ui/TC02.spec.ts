import { test, expect } from '@playwright/test';
import { IMDHomePage } from '../pages/IMDHomePage';
import { ChartsPage } from '../pages/ChartsPage';
import { TitlePage } from '../pages/TitlePage';


test('seleccionar una calificacion de 5 estrellas', async({page}) =>{
   
    const home = new IMDHomePage(page);
    await home.goto('/');
    await home.waitForVisible();
    await home.menuComponent.waitForVisible();
    await home.menuComponent.openMenu();
    await home.menuComponent.goToOption('Top box office');
   
    
    const chartsPage = new ChartsPage(page);
    await chartsPage.waitForVisible()
    await expect(chartsPage.chartName,'Error: El titulo no coincide con el esperado')
    .toHaveText('Top box office (US)');
    await chartsPage.selectByItemNumber(1);

    const titlePage = new TitlePage(page);
    await titlePage.waitForVisible();
    await titlePage.clickBtnRate();
    await titlePage.selectRating(5);
    
})