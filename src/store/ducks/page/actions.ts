import types, { State } from './types';
import errorTypes from '../error/types';
import { logger } from '../../../utils';
import { getPage } from '../../../shared/src/client';

function loadPage({ slug }: {
  slug: string
}): any {
  return async (dispatch: any) => {
    const page = await getPage({
      slug
    });

    if(!page) {
      dispatch({
        type: types.SET_NOT_FOUND,
        payload: {
          slug
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
          slug,
          data: {
            ...page,
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