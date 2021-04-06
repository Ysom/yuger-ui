import Button, {ButtonSize, ButtonType} from './components/Button/button'
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Yuger-UI：基于 React 和 TypeScript 开发的 UI 库.</p>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>按钮</Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">Link Button</Button>
      </header>
    </div>
  );
}

export default App;
