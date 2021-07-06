import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  className?: string;
  theme? : ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classnames('viking-icon', className, {
    [`icon-${theme}`]: theme,
  });
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  );
};

export default Icon;