import { useGame } from "@/provider/GameProvider";
import "./styles/index.scss";

const Configuration = () => {
  const { status, alphaBetaPruningEnabled, setAlphaBetaPruningEnabled, resetGame, activeTurn, updateBestMove } =
    useGame();

  return (
    <div className="configuration">
      <button className="configuration__btn-primary" onClick={resetGame}>
        New Game
      </button>

      {status === "inprogress" && (
        <button className="configuration__btn-primary" disabled={!activeTurn} onClick={updateBestMove}>
          Show Best Move
        </button>
      )}

      <button
        className={`configuration__btn-${alphaBetaPruningEnabled ? "error" : "success"}`}
        onClick={() => setAlphaBetaPruningEnabled(!alphaBetaPruningEnabled)}
        disabled={status === "inprogress" && !activeTurn}
      >
        {alphaBetaPruningEnabled ? "Disable" : "Enable"} Alpha/Beta Pruning
      </button>
    </div>
  );
};

export default Configuration;
