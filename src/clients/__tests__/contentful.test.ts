/**
 * Since our test runs in a NodeJS
 * environment instead of React Native
 * we have to swap out the client
 */
jest.mock('contentful/dist/contentful.browser.min.js', () => {
  const contentful = require('contentful');
  return {
    __esModule: true,
    ...contentful
  };
});

import { client } from '../contentful';

describe('contentful', () => {

  it('getEntries', async (done) => {
    let entries = await client.getEntries();
    expect(entries).toMatchObject({
      sys: expect.any(Object),
      total: expect.any(Number),
      skip: expect.any(Number),
      limit: expect.any(Number),
      items: expect.any(Array),
      errors: expect.any(Array),
      includes: expect.any(Object)
    });
    done();
  });

});
