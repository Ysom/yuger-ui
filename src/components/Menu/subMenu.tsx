import React, { useContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
};

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext);
  // 此时defaultOpenSubMenus为string或undefined，需断言为string array
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpend);
  
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opend': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  const clickEvents = context.mode === 'vertical' ?
    {
      onClick: handleClick
    } : {};
  const hoverEvents = context.mode !== 'vertical' ?
    {
      onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
      onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    } : {};

  const renderChildren = () => {
    const subMenuClasses = classNames('yuger-submenu', {
      'menu-opened': menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem');
      }
    });
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  };

  return (
    <li className={classes} key={index} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon className="arrow-icon" icon="angle-down" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;