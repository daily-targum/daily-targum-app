import { Article } from '../../types';

jest.mock('../../utils', () => ({
  logger: {
    logError: jest.fn()
  }
}));

jest.mock('../../clients/contentful', () => {
  const ARTICLE: Article = {
    id: '982-af8ojpjoiadfp83498',
    title: 'About',
    media: '',
    author: 'Jon Doe',
    date: '01-18-2020',
    content: '',
    url: 'https://google.com'
  };
  return {
    client: {
      getEntries: (options: any) => {
        const title = options['fields.title[match]'];
        const items = title === 'About' ?  [ARTICLE] : [];
        return { items };
      }
    },
    ARTICLE
  };
});

import React from 'react';
import pageReducer, { pageActions, usePageSelector } from '../ducks/page';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
// @ts-ignore
import { ARTICLE } from '../../clients/contentful';

describe('page', () => {

  it('About', (done) => {
    const store = createStore(combineReducers({
      page: pageReducer
    }), applyMiddleware(thunk));
    expect(store.getState().page.items.About).toBe(undefined);
    store.subscribe(() => {
      let res = store.getState().page.items.About;
      expect(res.id).toBe(ARTICLE.id);
      expect(res.title).toBe(ARTICLE.title);
      expect(res.date).toBe(ARTICLE.date);
      done();
    });
    store.dispatch(pageActions.loadPage({
      title: 'About'
    }));
  });

  it('404', (done) => {
    const store = createStore(combineReducers({
      page: pageReducer
    }), applyMiddleware(thunk));
    expect(store.getState().page.items.ThisPageDoesNotExist).toBe(undefined);
    store.subscribe(() => {
      let res = store.getState().page.items.ThisPageDoesNotExist;
      expect(res).toBe(null);
      done();
    });
    store.dispatch(pageActions.loadPage({
      title: 'ThisPageDoesNotExist'
    }));
  });

  it('usePageSelector', () => {
    const store = createStore(combineReducers({
      page: pageReducer
    }), applyMiddleware(thunk));
    let state;
    function ReadContext() {
      state = usePageSelector(s => s);
      return null;
    }
    renderer.create(
      <Provider store={store}>
        <ReadContext/>
      </Provider>
    );
    expect(state).toBe(store.getState().page);
  });

});
