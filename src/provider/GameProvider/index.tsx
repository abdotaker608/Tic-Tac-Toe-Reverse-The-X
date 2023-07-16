import React, { useCallback, useContext, useEffect, useState } from "react";
import { GameContextShape, GameMoves, GameStatus, GameTurn } from "./types";
import { Board, Coordinate } from "@/types";
import { initialBoard, initialMoves } from "./constants";
import { minimax } from "./utils/minimax";
import { checkWinner } from "./utils/check-winner";

const GameContext = React.createContext({} as GameContextShape);

const GameProvider = ({ children }: React.PropsWithChildren) => {
  const [started, setStarted] = useState(false);

  const [status, setStatus] = useState<GameStatus>("starting");

  const [alphaBetaPruningEnabled, setAlphaBetaPruningEnabled] = useState(false);

  const [activeTurn, setActiveTurn] = useState<GameTurn>(Math.random() < 0.5 ? 0 : 1);

  const [winner, setWinner] = useState<GameTurn>();

  const [lossCoordinates, setLossCoordinates] = useState<Coordinate[]>();

  const [board, setBoard] = useState<Board>(initialBoard);

  const [moves, setMoves] = useState<GameMoves>(initialMoves);

  const [bestMove, setBestMove] = useState<Coordinate>();

  const startGame = useCallback(() => setStarted(true), []);

  const toggleTurn = useCallback(() => setActiveTurn((activeTurn ^ 1) as GameTurn), [activeTurn]);

  const makeMove = useCallback(
    (i: number, j: number) => {
      const newBoard = board.map((row) => [...row]);
      const newMoves = moves.map((row) => [...row]);

      newBoard[i][j] = "X";
      newMoves[i][j] = activeTurn;

      setBoard(newBoard);
      setMoves(newMoves);

      const [winner, coordinates] = checkWinner(newBoard, activeTurn);

      if (winner !== null) {
        setWinner(winner);
        setLossCoordinates(coordinates as Coordinate[]);
        setStatus("ended");
      } else toggleTurn();

      setBestMove(undefined);
    },
    [board, toggleTurn, activeTurn, moves],
  );

  const updateBestMove = useCallback(() => {
    const { bestMove } = minimax(board, 1, true, alphaBetaPruningEnabled);

    if (bestMove) setBestMove(bestMove);
  }, [alphaBetaPruningEnabled, board]);

  const resetGame = useCallback(() => {
    setActiveTurn(Math.random() < 0.5 ? 0 : 1);
    setBoard(initialBoard);
    setMoves(initialMoves);
    setStatus("inprogress");
    setLossCoordinates(undefined);
    setWinner(undefined);
  }, []);

  useEffect(() => {
    if (status !== "inprogress") return;

    if (!activeTurn) {
      const { bestMove } = minimax(board, 0, true, alphaBetaPruningEnabled);

      if (bestMove) makeMove(bestMove[0], bestMove[1]);

      toggleTurn();
    }
  }, [makeMove, activeTurn, status, board, toggleTurn, alphaBetaPruningEnabled]);

  return (
    <GameContext.Provider
      value={{
        board,
        started,
        status,
        setStatus,
        startGame,
        alphaBetaPruningEnabled,
        setAlphaBetaPruningEnabled,
        activeTurn,
        toggleTurn,
        makeMove,
        moves,
        winner,
        resetGame,
        bestMove,
        lossCoordinates,
        updateBestMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

export const useGame = () => useContext(GameContext);
