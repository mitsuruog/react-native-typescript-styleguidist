import React from 'react';
import { Button as RNButton, ButtonProps as RNButtonProps } from 'react-native';

interface ButtonProps extends RNButtonProps {
}

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { title, ...rest } = props;
  return (
    <RNButton
      title={title}
      {...rest}
    />
  )
};
