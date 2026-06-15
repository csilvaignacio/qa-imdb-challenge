import { test, expect } from '@playwright/test';
import { IMDHomePage } from '../pages/IMDHomePage';
import { ChartsPage } from '../pages/ChartsPage';
import { TitlePage } from '../pages/TitlePage';
import { GalleryPage } from '../pages/GalleryPage';



test('mostrar solo las fotos de Danny Trejo y luego hacer clic en la segunda foto de la lista.', async({page}) =>{
   
    const home = new IMDHomePage(page);
    await home.goto('/');
    await home.waitForVisible();
    await home.menuComponent.waitForVisible();
    await home.menuComponent.openMenu();
    await home.menuComponent.goToOption('Top 250 TV shows');

    const chartsPage = new ChartsPage(page);
    await chartsPage.waitForVisible();
    await chartsPage.selectByName('Breaking Bad');

    const titlePage = new TitlePage(page);
    await expect(titlePage.titleName).toHaveText('Breaking Bad');
    await titlePage.clickMediaTab('photo');
    await titlePage.mediaViewer.waitForVisible();
    await titlePage.mediaViewer.openGallery();
    
    const gallery = new GalleryPage(page);
    await gallery.waitForVisible();
    await gallery.filterComponent.waitForVisible();
    await gallery.filterComponent.openFilter();
    await gallery.filterComponent.filterByPerson('Danny Trejo');
    await gallery.filterComponent.closeFilter();
    await gallery.selectImageFromList(1);
    
})