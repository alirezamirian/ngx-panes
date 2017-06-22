import {NgxPanesPage} from './app.po';

describe('ngx-panes App', () => {
  let page: NgxPanesPage;

  beforeEach(() => {
    page = new NgxPanesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
