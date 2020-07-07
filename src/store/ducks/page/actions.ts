import { types } from './types';
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