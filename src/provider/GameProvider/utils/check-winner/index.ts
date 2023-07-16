import { Board } from "@/types";
import { GameTurn } from "../../types";

export const checkWinner = (board: Board, activeTurn: GameTurn) => {
  const coordinates = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (const coordinate of coordinates) {
    if (coordinate.map(([i, j]) => board[i][j]).every((value) => value === "X")) {
      return [(activeTurn ^ 1) as GameTurn, coordinate] as const;
    }
  }

  return [null];
};
