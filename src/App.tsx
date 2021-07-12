import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition';
import "./App.scss";

library.add(fas);

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <p>Yuger-UI：基于 React 和 TypeScript 开发的 UI 库.</p>
        <div className="btn-container">
          <Button>Default</Button>
          <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
            Primary Small
          </Button>
          <Button btnType={ButtonType.Danger} size={ButtonSize.Large} onClick={() => {setShow(!show)}}>
            Danger Large Toggle
          </Button>
          <Button btnType={ButtonType.Link} href="https://www.baidu.com" target="_blank">
            Link
          </Button>
          <Button btnType={ButtonType.Link} disabled href="www.baidu.com">
            Link Disabled
          </Button>
        </div>
        <div className="menu-container">
          <Menu 
            defaultIndex='0'
            onSelect={(index) => { console.log(index) }}
            defaultOpenSubMenus={['2']}
          >
            <MenuItem>
              first Menu
            </MenuItem>
            <MenuItem>
              second Menu
            </MenuItem>
            <SubMenu title="SubMenu title">
              <MenuItem>item1</MenuItem>
              <MenuItem>item2</MenuItem>
            </SubMenu>
            <MenuItem disabled>
              third Menu
            </MenuItem>
          </Menu>
          <Icon icon="arrow-down" theme="primary"/>
        </div>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-top"
          wrapper
        >
          <Button>按钮</Button>
        </Transition>
      </header>
    </div>
  );
}

export default App;
