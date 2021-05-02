import React, { createContext, useState } from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: number) => void;

export interface MenuProps {
  className?: string;
  defaultIndex?: number;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}
interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({index: 0});

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, onSelect, children } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('yuger-menu', className, {
    'menu-vertical': mode === 'vertical',
  })
  const handleClick = (index: number) => {
    setActive(index);
    if(onSelect){
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  }

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        { children }
      </MenuContext.Provider>
      
    </ul>
  )
}

export default Menu;