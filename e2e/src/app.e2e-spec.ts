import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display cities ', async() => {
    const btn = page.getBtnSearch();
    page.navigateTo();
    browser.sleep(4000);
    page.getInputText().sendKeys('lon');
    await btn.click();
    browser.sleep(2000);
    expect(page.getInputText().getText()).toEqual('lon');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
