import React, { useState } from 'react';
import { View, Image } from 'react-native';

/**
 * Camp value between min and max
 * 
 * @param min lower bound
 * @param num value
 * @param max upper bound
 */
export function clamp(min: number, num: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Function is biased towards the edges
 * So |--x--------| will become |x-----------|
 * But |-----x-----| should remain |-----x-----|
 * 
 * @param x point on segment
 * @param segment one dimensional length
 * @returns percent value between 0 and 1
 */
export function increaseEdgeBias(x: number, segment: number) {
  const ratio = (x / segment);
  // magicScaler controls
  // the level of bias
  const magicScaler = 1.4;
  const scaled = ((ratio - 0.5) * magicScaler) + 0.5;
  return clamp(0, scaled, 1);
}

export function FocalPointImage({
  src,
  size,
  focalPoint,
  style,
  offset = {}
}: {
  src: string,
  /**
   * Size of image. This number is
   * used to place the focal point
   */
  size: {
    height: number,
    width: number
  },
  /**
   * A point in the image to that
   * will always be visible even
   * if the image is cropped
   */
  focalPoint: {
    x: number,
    y: number
  },
  style?: any,
  /**
   * Offset is helpful for handling the
   * notch/statusbar at the top of phones
   */
  offset?: {
    top?: number,
    left?: number
  }
}) {

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  function onLayout(event: any) {
    const {layout} = event.nativeEvent;
    setHeight(layout.height);
    setWidth(layout.width);
    setIsLoading(false);
  }

  const computedStyle = Object.assign({}, {
    overflow: 'hidden'
  }, style);

  const aspectRatio = size.width / size.height;
  let scalar: number;
  if(aspectRatio > 1) {
    // width > height
    scalar = height / size.height;
  } else {
    // height >= width
    scalar = width / size.width;
  }

  const imageComputedDimensions = {
    height: scalar * size.height,
    width: scalar * size.width,
  };

  const imageDifference = {
    height: height - imageComputedDimensions.height,
    width: width - imageComputedDimensions.width
  };

  return (
    <View
      style={computedStyle}
      onLayout={onLayout}
    >
      <Image
        source={{uri: src}}
        style={{
          ...imageComputedDimensions,
          top: aspectRatio < 1 ? imageDifference.height * increaseEdgeBias(focalPoint.y - (offset.top ? offset.top : 0), size.height) : undefined,
          left: aspectRatio > 1 ? imageDifference.width * increaseEdgeBias(focalPoint.x - (offset.left ? offset.left : 0), size.width) : undefined,
          display: isLoading ? 'none' : undefined
        }}
        resizeMethod="resize"
      />
    </View>
  );
}

export default FocalPointImage;