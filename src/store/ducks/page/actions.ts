import types, { State } from './types';
import errorTypes from '../error/types';
import { client } from '../../../clients/contentful';
import { logger } from '../../../utils';

function loadPage({ title }: {
  title: string
}): any {
  return async (dispatch: any) => {
    const {items} = await client.getEntries({
      'content_type': 'page',
      'fields.title[match]': title
    });

    if(items.length === 0) {
      dispatch({
        type: types.SET_NOT_FOUND,
        payload: {
          title
        }
      });
      // dispatch({
      //   type: errorTypes.DISPLAY_ERROR,
      //   payload: '404. Page Not Found.'
      // });
      // logger.logError(`No contentful page found with title "${title}"`);
    }

    else {
      dispatch({
        type: types.LOAD_PAGE,
        payload: {
          title,
          data: {
            ...items[0],
            updatedCacheAt: Date.now()
          }
        }
      });
    }
  };
}

export {
  loadPage
};