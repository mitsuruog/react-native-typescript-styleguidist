import React from 'react';
import { IconProps as RNVIIconProps } from 'react-native-vector-icons/Icon';
import RNVIIcon from 'react-native-vector-icons/Ionicons';

interface IconProps extends RNVIIconProps{
}

export const Icon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <RNVIIcon {...props} />
  )
};
