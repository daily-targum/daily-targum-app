jest.mock('../../shared/src/client/actions/articles');

import newsReducer, { newsActions } from '../ducks/news';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

describe('news duck', () => {

  it('initial state', () => {
    const store = createStore(combineReducers({
      news: newsReducer
    }), applyMiddleware(thunk));
    expect(store.getState().news).toMatchSnapshot();
  });

  it('refreshAll()', async (done) => {
    const store = createStore(combineReducers({
      news: newsReducer
    }), applyMiddleware(thunk));
    let state = store.getState();
    expect(state.news.loading).toBe(true);
    Object.keys(state.news.feed).forEach(feed => {
      expect(state.news.feed[feed]?.data?.length).toBe(0);
    });
    store.subscribe(() => {
      state = store.getState();
      if(!state.news.refreshingAll) {
        expect(state.news.loading).toBe(false);
        Object.keys(state.news.feed).forEach(feed => {
          expect(state.news.feed[feed]?.data?.length).toBeGreaterThan(0);
        });
        done();
      }
    });
    store.dispatch(newsActions.refreshAll({quietly: false}));
  });

});
