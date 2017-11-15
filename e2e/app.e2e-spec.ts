import { Ng2pPage } from './app.po';

describe('ng2p App', () => {
  let page: Ng2pPage;

  beforeEach(() => {
    page = new Ng2pPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
