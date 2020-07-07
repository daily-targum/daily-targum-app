import React from 'react';
import { useSelector, Provider } from '../context';
import { store } from '../store';
import renderer from 'react-test-renderer';

describe('Redux Provider', () => {

  it('hydration', async (done) => {
    let state: any;
    function ReadContext() {
      state = useSelector(s => s.theme);
      expect(state).toBe(store.getState().theme);
      done();
      return null;
    }
    renderer.create(
      <Provider>
        <ReadContext/>
      </Provider>
    );

  });

});