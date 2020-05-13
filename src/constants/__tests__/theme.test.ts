import * as theme from '../theme';

describe('theme', () => {

  it('spacing', () => {
    const spacingBase = theme.light.spacing(1);
    expect(theme.light.spacing(2)).toBe(spacingBase * 2);
    expect(theme.light.spacing).toBe(theme.dark.spacing);
  });

});
