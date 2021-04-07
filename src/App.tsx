import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Yuger-UI：基于 React 和 TypeScript 开发的 UI 库.</p>
        <div>
          <Button disabled>Default</Button>
          <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
            Primary Small
          </Button>
          <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
            Danger Large
          </Button>
          <Button btnType={ButtonType.Link} href="www.baidu.com">
            Link
          </Button>
          <Button btnType={ButtonType.Link} disabled href="www.baidu.com">
            Link Disabled
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
