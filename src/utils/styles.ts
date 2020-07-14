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

function aspectRatioFullWidth(x: number, y: number) {
  return {
    width: '100%',
    paddingTop: `${(y / x) * 100}%`
  } as const;
}

function card(theme: Theme) {
  return {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.divider,
    borderRadius: theme.roundness(1),
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden'
  } as const;
}

function centerBackgroundImage() {
  return {
    // resizeMode: 'cover', 
    // justifyContent: 'center', 
    // alignItems: 'center'
  } as const;
}

function container(theme: Theme) {
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  } as const;
}

export const styleHelpers = {
  absoluteFill,
  aspectRatioFullWidth,
  card,
  centerBackgroundImage,
  container,
  flex,
  lockHeight,
  lockWidth,
  page,
};