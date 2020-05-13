import React from 'react';
import { useThemeSelector } from '../ducks/theme';
import { store } from '../store';
import renderer from 'react-test-renderer';
import Provider from '../Provider';

describe('Redux Provider', () => {

  it('hydration', async (done) => {
    let state: any;
    function ReadContext() {
      state = useThemeSelector(s => s);
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