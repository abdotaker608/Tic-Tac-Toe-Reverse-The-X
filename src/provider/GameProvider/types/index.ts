import { Board, Coordinate } from "@/types";

export type GameStatus = "starting" | "inprogress" | "ended";

export type GameTurn = 0 | 1; // 0 for player, 1 for Bot

export type GameMoves = (GameTurn | null)[][];

export interface GameContextShape {
  started: boolean;
  startGame: () => void;
  status: GameStatus;
  setStatus: (status: GameStatus) => void;
  alphaBetaPruningEnabled: boolean;
  setAlphaBetaPruningEnabled: (ab: boolean) => void;
  activeTurn: GameTurn;
  toggleTurn: () => void;
  board: Board;
  makeMove: (i: number, j: number) => void;
  moves: GameMoves;
  winner?: GameTurn;
  resetGame: () => void;
  bestMove?: Coordinate;
  lossCoordinates?: Coordinate[];
  updateBestMove: () => void;
}
