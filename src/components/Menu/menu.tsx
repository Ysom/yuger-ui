import React from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps {
  className?: string;
  defaultIndex?: number;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectIndex: number) => void;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, children } = props;
  const classes = classNames('yuger-menu', className, {
    'menu-vertical': mode === 'vertical',
  })

  return (
    <ul className={classes} style={style}>
      { children }
    </ul>
  )
}

export default Menu;