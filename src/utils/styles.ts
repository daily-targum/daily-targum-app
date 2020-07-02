import { Theme } from '../types';

function page(theme: Theme) {
  return {
    flex: 1,
    backgroundColor: theme.colors.background,
    height: '100%'
  } as const;
}

type Flex<D> = {
  display: 'flex'
  flexDirection: D
}

function flex(direction: 'row'): Flex<'row'>
function flex(direction?: 'column'): Flex<'column'>
function flex(direction: string = 'column'): Flex<string>
{
  return {
    display: 'flex',
    flexDirection: direction
  };
}

export const styles = {
  page,
  flex
};