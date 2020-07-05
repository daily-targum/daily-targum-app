import { Theme } from '../types';

function absoluteFill() {
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
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

function lockWidth<N extends number | string>(width: N): {
  minWidth: N
  width: N
  maxWidth: N
} {
  return {
    minWidth: width,
    width,
    maxWidth: width
  }
}

function lockHeight<N extends number | string>(height: N): {
  minHeight: N
  height: N
  maxHeight: N
} {
  return {
    minHeight: height,
    height,
    maxHeight: height
  }
}

function page(theme: Theme) {
  return {
    flex: 1,
    backgroundColor: theme.colors.background,
    height: '100%'
  } as const;
}

export const styleHelpers = {
  absoluteFill,
  flex,
  lockHeight,
  lockWidth,
  page,
};