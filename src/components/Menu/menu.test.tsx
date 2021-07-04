import React from 'react';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}
const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        normal
      </MenuItem>
      <SubMenu title="dropMenu">
        <MenuItem>
          drop 1
        </MenuItem>
      </SubMenu>
    </Menu>
  );
}

const createStyles = () => {
  const cssStr = `
    .yuger-submenu {
      display: none;
    }
    .yuger-submenu.menu-opened {
      display: block;
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssStr;

  return style;
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disableElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  // 每个 case 执行前都会执行此钩子
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyles());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disableElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('yuger-menu test');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    /**
     * [:scope]：https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope
     */
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disableElement).toHaveClass('menu-item is-disabled');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('normal');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  it('should', async () => {
    expect(wrapper.queryByText('drop 1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropMenu');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop 1')).toBeVisible;
    });
    fireEvent.click(wrapper.getByText('drop 1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop 1')).not.toBeVisible();
    });
  });
});