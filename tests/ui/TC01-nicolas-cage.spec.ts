import { test, expect } from '@playwright/test';
import { IMDHomePage } from '../pages/IMDHomePage';
import { ProfilePage } from '../pages/ProfilePage';


test('navegar al perfil de Nicolas Cage y hacer click en la primera película con tag Completed', async({page}) =>{
    const home = new IMDHomePage(page);
    await home.goto('/');
    await home.waitForVisible();

    await home.menuComponent.waitForVisible();
    await home.menuComponent.search('Nicolas Cage');

    const profile = new ProfilePage(page);
    await profile.waitForVisible();
    await expect(profile.profileName,'El nombre no coincide con el esperado').toHaveText('Nicolas Cage');
    
    await profile.expandUpcoming();
    await profile.clickFirstCompletedMovie();
})

