import { Theme } from '../types';

function page(theme: Theme) {
  return {
    flex: 1,
    backgroundColor: theme.colors.background,
    height: '100%'
  } as const;
}

export const styles = {
  page
};