import { by, element } from 'detox';
// @ts-ignore
import { reloadApp } from 'detox-expo-helpers';

const NAVIGATION_TIMEOUT = 20000;

describe('Navigation', () => {

  beforeAll(async () => {
    await reloadApp();
    // try and dismiss notification prompt
    try {
      await waitFor(element(by.id('App'))).toBeVisible().withTimeout(1000 * 60 * 5);
      await element(by.label("No")).atIndex(0).tap();
    } catch (e) {}
  });

  beforeEach(async () => {
    await reloadApp();
    // try and dismiss notification prompt
    try {
      await waitFor(element(by.id('App'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
      await element(by.label("No")).atIndex(0).tap();
    } catch (e) {}
  });

  it('defaults to home screen', async () => {
    await waitFor(element(by.id('HomeScreen'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
  });

  it('open drawer', async () => {
    await waitFor(element(by.id('DrawerToggle').withAncestor(by.id('PageHeader')))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('DrawerToggle').withAncestor(by.id('PageHeader'))).tap();
    await waitFor(element(by.id('Drawer'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
  });

  it('navigate to about page', async () => {
    await waitFor(element(by.id('DrawerToggle').withAncestor(by.id('PageHeader')))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('DrawerToggle').withAncestor(by.id('PageHeader'))).tap();
    await waitFor(element(by.id('Drawer'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('Drawer-About')).tap();
    await waitFor(element(by.id('pageScreen-about'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    // can go back
    await element(by.traits(['button']).withAncestor(by.id('Header'))).atIndex(0).tap();
    await waitFor(element(by.id('HomeScreen'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
  });

  it('navigate to contact page', async () => {
    await waitFor(element(by.id('DrawerToggle').withAncestor(by.id('PageHeader')))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('DrawerToggle').withAncestor(by.id('PageHeader'))).tap();
    await waitFor(element(by.id('Drawer'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('Drawer-Contact')).tap();
    await waitFor(element(by.id('pageScreen-contact'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    // can go back
    await element(by.traits(['button']).withAncestor(by.id('Header'))).atIndex(0).tap();
    await waitFor(element(by.id('HomeScreen'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
  });

  it('navigate to get involved page', async () => {
    await waitFor(element(by.id('DrawerToggle').withAncestor(by.id('PageHeader')))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('DrawerToggle').withAncestor(by.id('PageHeader'))).tap();
    await waitFor(element(by.id('Drawer'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('Drawer-GetInvolved')).tap();
    await waitFor(element(by.id('pageScreen-getInvolved'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    // can go back
    await element(by.traits(['button']).withAncestor(by.id('Header'))).atIndex(0).tap();
    await waitFor(element(by.id('HomeScreen'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
  });

  it('navigate to settings page', async () => {
    await waitFor(element(by.id('DrawerToggle').withAncestor(by.id('PageHeader')))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('DrawerToggle').withAncestor(by.id('PageHeader'))).tap();
    await waitFor(element(by.id('Drawer'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    await element(by.id('Drawer-Settings')).tap();
    await waitFor(element(by.id('SettingsScreen'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
    // can go back
    await element(by.traits(['button']).withAncestor(by.id('Header'))).atIndex(0).tap();
    await waitFor(element(by.id('HomeScreen'))).toBeVisible().withTimeout(NAVIGATION_TIMEOUT);
  });
});
