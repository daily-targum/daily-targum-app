import React from 'react';
import Grid from './Grid/native';
import Theme from './Theme'
import { ReactChild } from '../types';

function getColSizes(numOfCols: number): {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}[] {
  const xs = 24;

  if (numOfCols === 1) {
    return ([
      { xs, sm: 12 },
      { xs: 0 },
      { xs: 0 },
      { xs: 0 }
    ]);
  } 

  else if(numOfCols === 2) {
    return ([
      { xs, md: 12 },
      { xs, md: 12 },
      { xs: 0 },
      { xs: 0 }
    ]);
  }

  else if(numOfCols === 3) {
    return ([
      { xs, sm: 12, lg: 8 },
      { xs, sm: 12, lg: 8 },
      { xs, sm: 0, lg: 8 },
      { xs: 0 }
    ]);
  }

  return ([
    { xs, sm: 12, md: 8, xl: 6 },
    { xs, sm: 12, md: 8,  xl: 6 },
    { xs, sm: 0, md: 8, xl: 6 },
    { xs: 0, xl: 6 }
  ]);
}

export function CardRow<I>({
  items,
  children
}: {
  items: (I | null)[],
  children: (item: I | null, index?: number) => ReactChild
}) {
  const theme = Theme.useTheme();
  const colSizes = getColSizes(items.length);
  return (
    <Grid.Row spacing={theme.spacing(2)}>
      <Grid.Col xs={colSizes[0].xs} sm={colSizes[0].sm} md={colSizes[0].md} lg={colSizes[0].lg} xl={colSizes[0].xl}>
        {children(items[0], 0)}
      </Grid.Col>
      <Grid.Col xs={colSizes[1].xs} sm={colSizes[1].sm} md={colSizes[1].md} lg={colSizes[1].lg} xl={colSizes[1].xl}>
        {children(items[1], 1)}
      </Grid.Col>
      <Grid.Col xs={colSizes[2].xs} sm={colSizes[2].sm} md={colSizes[2].md} lg={colSizes[2].lg} xl={colSizes[2].xl}>
        {children(items[2], 2)}
      </Grid.Col>
      <Grid.Col xs={colSizes[3].xs} sm={colSizes[3].sm} md={colSizes[3].md} lg={colSizes[3].lg} xl={colSizes[3].xl}>
          {children(items[3], 3)}
        </Grid.Col>
    </Grid.Row>
  )
}

export default CardRow;