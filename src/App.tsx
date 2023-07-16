import Game from "./components/Game";
import Home from "./components/Home";
import { useGame } from "./provider/GameProvider";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useRef } from "react";
import "./styles/App.scss";

function App() {
  const { started } = useGame();

  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <div className="wrapper">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={`${started}`}
            nodeRef={nodeRef}
            classNames="fade"
            addEndListener={(done: CallableFunction) => {
              nodeRef.current?.addEventListener("transitionend", () => done(), false);
              return;
            }}
            unmountOnExit
          >
            <div ref={nodeRef}>{started ? <Game /> : <Home />}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default App;
