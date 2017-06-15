import { RigManagerPage } from './app.po';

describe('rig-manager App', () => {
  let page: RigManagerPage;

  beforeEach(() => {
    page = new RigManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
