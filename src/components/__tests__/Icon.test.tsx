import React from 'react';
import renderer from 'react-test-renderer';
import Icon from '../Icon';

const randomString = (): string => Math.random().toString(36).substring(2, 15);

describe('<Icon />', () => {

  it('renders correctly', () => {
    const icon1 = renderer
      .create(<Icon name='back'/>)
      .toJSON();
    expect(icon1).toMatchSnapshot();

    const icon2 = renderer
      .create(<Icon focused={false} name='back-circle'/>)
      .toJSON();
    expect(icon2).toMatchSnapshot();
  });

  it('onPress fires correctly', () => {
    const mockFunc = jest.fn();
    const icon = renderer.create(<Icon onPress={mockFunc}/>);
    icon.root.props.onPress();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('testID', () => {
    const randomID = randomString();
    const tree = renderer.create(<Icon testID={randomID}/>).toJSON();
    expect(tree?.props?.testID).toBe(randomID);
  });
});
