import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: string) => void;

export interface MenuProps {
  className?: string;
  defaultIndex?: string;
  defaultOpenSubMenus?: string[];
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'});

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, onSelect, children, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('yuger-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setActive(index);
    if(onSelect){
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // FunctionComponentElement 这里要拿到的是 child 实例
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return child;
        // 这里通过cloneElement方法，克隆元素并传入index，使得不用手动在MenuItem上加上index
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component or SubMenu');
      }
    });
  }

  // data-testid 用于测试case拿到元素
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        { renderChildren() }
      </MenuContext.Provider>
      
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;