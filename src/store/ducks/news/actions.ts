import types from './types';
import { actions } from '../../../shared/src/client';
import { errorActions } from '../error';

function loadCategory({
  category,
  nextToken = '',
  manual = false
}: {
  category: string,
  nextToken?: string,
  manual?: boolean
}): any {
  return async (dispatch: any, getState: any) => {
    const prevCategory = getState().news.feed[category];

    dispatch({
      type: types.CATEGORY_REFRESHING,
      payload: {
        category,
        manual
      }
    });

    const feed = await actions.getArticles({
      category, 
      nextToken
    });

    const rssItems = feed.items;
    const nextNextToken = feed.nextToken;

    if(rssItems.length === 0) {
      dispatch(errorActions.displayError({
        error: 'Unable to load articles'
      }));
    }

    let data: any[];
    if(prevCategory && nextToken !== '') {
      data = [
        ...prevCategory.data,
        ...rssItems
      ];
    } else{
      data = rssItems;
    }

    dispatch({
      type: types.CATEGORY_SET,
      payload: {
        category,
        nextToken: nextNextToken,
        data
      }
    });
  };
}

function saveScrollIndex({
  category,
  scrollIndex
}: {
  category: string,
  scrollIndex: number
}) {
  return {
    type: types.SAVE_SCROLL_INDEX,
    payload: {
      category,
      scrollIndex
    }
  };
}

function refreshAll({
  quietly = false
}: {
  quietly?: boolean
}): any {
  return async (dispatch: any) => {
    if(!quietly) {
      dispatch({
        type: types.SET_REFRESH_ALL,
        payload: true
      });
    }
    await Promise.all([
      dispatch(loadCategory({ category: 'News' })),
      dispatch(loadCategory({ category: 'Sports' })),
      dispatch(loadCategory({ category: 'Opinions' })),
      dispatch(loadCategory({ category: 'inside-beat' }))
    ]);
    dispatch({
      type: types.SET_REFRESH_ALL,
      payload: false
    });
  }
}

export {
  loadCategory,
  refreshAll,
  saveScrollIndex
};