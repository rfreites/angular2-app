import { Angular2AppPage } from './app.po';

describe('angular2-app App', () => {
  let page: Angular2AppPage;

  beforeEach(() => {
    page = new Angular2AppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
