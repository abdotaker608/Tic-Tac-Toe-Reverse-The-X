import React, { useCallback } from "react";
import { useGame } from "@/provider/GameProvider";
import "./styles/index.scss";

const Board = () => {
  const { board, activeTurn, makeMove, moves, status, bestMove, lossCoordinates } = useGame();

  const handleClick = useCallback(
    (i: number, j: number) => {
      if (!activeTurn || status !== "inprogress") return;

      makeMove(i, j);
    },
    [activeTurn, makeMove, status],
  );

  return (
    <div className="board">
      {board.flat().map((cell, index) => {
        const i = Math.floor(index / 3);
        const j = index % 3;

        return (
          <div
            className={`cell ${moves[i][j] === 0 ? "bot" : ""} ${moves[i][j] === 1 ? "player" : ""} ${
              bestMove && bestMove[0] === i && bestMove[1] === j ? "hint" : ""
            } ${
              lossCoordinates && lossCoordinates.some((coordinate) => coordinate[0] === i && coordinate[1] === j)
                ? "loss"
                : ""
            }`}
            key={index}
            onClick={() => handleClick(i, j)}
          >
            {cell}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
