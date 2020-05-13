import React from 'react';
import FocalPointImage, { clamp, increaseEdgeBias } from '../FocalPointImage';
import renderer, { act } from 'react-test-renderer';

describe('<FocalPointImage />', () => {

  it('clamp', () => {
    expect(clamp(0, 5, 3)).toBe(3);
    expect(clamp(0, -1, 3)).toBe(0);
    expect(clamp(0, 2, 3)).toBe(2);
  });

  it('increaseEdgeBias', () => {
    // center
    expect(increaseEdgeBias(5, 10)).toBe(0.5);
    expect(increaseEdgeBias(0.5, 1)).toBe(0.5);
    // swing left
    expect(increaseEdgeBias(0.25, 1)).toBeLessThan(0.25);
    expect(increaseEdgeBias(0.49, 1)).toBeLessThan(0.49);
    // swing right
    expect(increaseEdgeBias(0.75, 1)).toBeGreaterThan(0.75);
    expect(increaseEdgeBias(0.51, 1)).toBeGreaterThan(0.51);
    // values really close to the edge should snap to the edge
    expect(increaseEdgeBias(0.01, 1)).toBe(0);
    expect(increaseEdgeBias(0.99, 1)).toBe(1);
  });

  it('renders correctly', () => {
    const centeredImage = renderer.create(
      <FocalPointImage
        src='https://via.placeholder.com/150x200'
        size={{
          width: 200,
          height: 150
        }}
        focalPoint={{
          x: 100,
          y: 75
        }}
      />
    );
    act(() => {
      // @ts-ignore
      centeredImage.root.children[0].props.onLayout({
        nativeEvent: {
          layout: {
            height: 100,
            width: 100
          }
        }
      });
    });
    expect(centeredImage.toJSON()).toMatchSnapshot();

    const offCetnerImage = renderer.create(
      <FocalPointImage
        src='https://via.placeholder.com/150x200'
        size={{
          width: 200,
          height: 150
        }}
        focalPoint={{
          x: 50,
          y: 75
        }}
      />
    );
    act(() => {
      // @ts-ignore
      offCetnerImage.root.children[0].props.onLayout({
        nativeEvent: {
          layout: {
            height: 100,
            width: 100
          }
        }
      });
    });
    expect(offCetnerImage.toJSON()).toMatchSnapshot();
  });

});