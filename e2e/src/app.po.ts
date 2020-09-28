import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getBtnSearch(): any {
    return element(by.id('btnSearch'));
  }

  getInputText(): any {
    return element(by.id('txtLocation'));
  }
}
