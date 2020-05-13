jest.mock('../Theme');
jest.useFakeTimers();

import React from 'react';
import ErrorAppBar from '../ErrorAppBar';
import renderer from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Text } from 'react-native';

const mockStore = configureStore([]);

describe('<ErrorAppBar />', () => {

  it('without error', () => {
    const store = mockStore({
      error: {
        error: null
      }
    });
    const tree = renderer.create(
      <ReduxProvider store={store}>
        <ErrorAppBar/>
      </ReduxProvider>
    );
    renderer.act(() => {});
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.root.findByType(Text).props.children).toBe(null);
  });

  it('with error', () => {
    const ERROR = '404. Page Not Found.';
    const store = mockStore({
      error: {
        error: ERROR
      }
    });
    const tree = renderer.create(
      <ReduxProvider store={store}>
        <ErrorAppBar/>
      </ReduxProvider>
    );
    renderer.act(() => {});
    expect(tree.root.findByType(Text).props.children).toBe(ERROR);
  });

});