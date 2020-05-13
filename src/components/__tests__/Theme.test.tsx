import React from 'react';
import Theme from '../Theme';
import renderer from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { theme } from '../../constants';

const mockStore = configureStore([]);

describe('Theme', () => {

  it('useTheme', () => {
    const store = mockStore({
      theme: {
        darkModeOverride: false
      }
    });
    let consumedTheme;
    function ReadTheme() {
      consumedTheme = Theme.useTheme();
      return null;
    }
    renderer.create(
      <ReduxProvider store={store}>
        <Theme.Provider>
          <ReadTheme/>
        </Theme.Provider>
      </ReduxProvider>
    );
    expect(consumedTheme).toMatchObject(theme.light);
    // check that theme persists
    // if tree is re-rendered
    renderer.act(() => {});
    expect(consumedTheme).toMatchObject(theme.light);
  });

  it('withTheme', () => {
    const store = mockStore({
      theme: {
        darkModeOverride: false
      }
    });
    let consumedTheme;
    function ReadTheme({theme}: {theme: any}) {
      consumedTheme = theme;
      return null;
    }
    const HOCReadTheme = Theme.withTheme(ReadTheme);
    renderer.create(
      <ReduxProvider store={store}>
        <Theme.Provider>
          <HOCReadTheme/>
        </Theme.Provider>
      </ReduxProvider>
    );
    expect(consumedTheme).toMatchObject(theme.light);
    // check that theme persists
    // if tree is re-rendered
    renderer.act(() => {});
    expect(consumedTheme).toMatchObject(theme.light);
  });

  it('darkModeOverride', () => {
    const store = mockStore({
      theme: {
        darkModeOverride: true
      }
    });
    let consumedTheme;
    function ReadTheme() {
      consumedTheme = Theme.useTheme();
      return null;
    }
    renderer.create(
      <ReduxProvider store={store}>
        <Theme.Provider>
          <ReadTheme/>
        </Theme.Provider>
      </ReduxProvider>
    );
    expect(consumedTheme).toMatchObject(theme.dark);
    // check that theme persists
    // if tree is re-rendered
    renderer.act(() => {});
    expect(consumedTheme).toMatchObject(theme.dark);
  });

  it('useStyleCreator', () => {
    const store = mockStore({
      theme: {
        darkModeOverride: false
      }
    });
    const styleCreator = Theme.makeStyleCreator(theme => ({
      container: {
        backgroundColor: theme.colors.background
      },
      text: {
        color: theme.colors.text
      },
      divider: {
        backgroundColor: theme.colors.divider
      },
      button: {
        backgroundColor: theme.colors.primary
      }
    }));
    let computedStyles;
    function ReadTheme() {
      computedStyles = Theme.useStyleCreator(styleCreator);
      return null;
    }
    renderer.create(
      <ReduxProvider store={store}>
        <Theme.Provider>
          <ReadTheme/>
        </Theme.Provider>
      </ReduxProvider>
    );
    const EXPECTED_STYLES = {
      container: {
        backgroundColor: theme.light.colors.background
      },
      text: {
        color: theme.light.colors.text
      },
      divider: {
        backgroundColor: theme.light.colors.divider
      },
      button: {
        backgroundColor: theme.light.colors.primary
      }
    };
    expect(computedStyles).toMatchObject(EXPECTED_STYLES);
    // check that theme persists
    // if tree is re-rendered
    renderer.act(() => {});
    expect(computedStyles).toMatchObject(EXPECTED_STYLES);
  });

  it('withStyleCreator', () => {
    const store = mockStore({
      theme: {
        darkModeOverride: false
      }
    });
    const styleCreator = Theme.makeStyleCreator(theme => ({
      container: {
        backgroundColor: theme.colors.background
      },
      text: {
        color: theme.colors.text
      },
      divider: {
        backgroundColor: theme.colors.divider
      },
      button: {
        backgroundColor: theme.colors.primary
      }
    }));
    let computedStyles;
    function ReadTheme({ styles }: { styles: any }) {
      computedStyles = styles
      return null;
    }
    const HOCReadTheme = Theme.withStyleCreator(ReadTheme, styleCreator);
    renderer.create(
      <ReduxProvider store={store}>
        <Theme.Provider>
          <HOCReadTheme/>
        </Theme.Provider>
      </ReduxProvider>
    );
    const EXPECTED_STYLES = {
      container: {
        backgroundColor: theme.light.colors.background
      },
      text: {
        color: theme.light.colors.text
      },
      divider: {
        backgroundColor: theme.light.colors.divider
      },
      button: {
        backgroundColor: theme.light.colors.primary
      }
    };
    expect(computedStyles).toMatchObject(EXPECTED_STYLES);
    // check that theme persists
    // if tree is re-rendered
    renderer.act(() => {});
    expect(computedStyles).toMatchObject(EXPECTED_STYLES);
  });
});
