import { chunkArray } from '../array';

import Constants from 'expo-constants';

describe('array', () => {

  it('chunkArray', () => {
    const array = [0,1,2,3,4,5,6,7,8,9];
    expect(chunkArray(array, 1)).toMatchObject([
      [0],[1],[2],[3],[4],[5],[6],[7],[8],[9]
    ]);
    expect(chunkArray(array, 2)).toMatchObject([
      [0,1],[2,3],[4,5],[6,7],[8,9]
    ]);
    expect(chunkArray(array, 3)).toMatchObject([
      [0,1,2],[3,4,5],[6,7,8],[9]
    ]);
    expect(chunkArray(array, 4)).toMatchObject([
      [0,1,2,3],[4,5,6,7],[8,9]
    ]);
    expect(chunkArray(array, 5)).toMatchObject([
      [0,1,2,3,4],[5,6,7,8,9]
    ]);
  });

});
