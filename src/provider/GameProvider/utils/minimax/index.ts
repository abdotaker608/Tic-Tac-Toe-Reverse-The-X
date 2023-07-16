import { Board, Coordinate } from "@/types";
import { GameTurn } from "../../types";
import { checkWinner } from "../check-winner";

export const _minimax = (
  board: Board,
  player: GameTurn,
  isMaximizingPlayer: boolean,
  useAlphaBetaPruning: boolean,
  alpha = -Infinity,
  beta = Infinity,
  depth = 0,
  track = { iterationCount: 0 },
) => {
  track.iterationCount += 1;

  const enemyPlayer = (player ^ 1) as GameTurn;

  const [winner] = checkWinner(board, enemyPlayer);

  if (winner !== null) return isMaximizingPlayer ? { score: 10 - depth } : { score: depth - 10 };

  let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
  let bestMove: Coordinate | undefined = undefined;

  for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board[i].length; ++j) {
      if (board[i][j] !== "-") continue;

      board[i][j] = "X";

      const { score } = _minimax(
        board,
        enemyPlayer,
        !isMaximizingPlayer,
        useAlphaBetaPruning,
        alpha,
        beta,
        depth + 1,
        track,
      );

      board[i][j] = "-";

      if (isMaximizingPlayer) {
        if (score > bestScore) {
          bestScore = score;
          bestMove = [i, j];
        }
        alpha = Math.max(alpha, bestScore);
      } else {
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
      }

      if (useAlphaBetaPruning && beta <= alpha) break;
    }
  }

  return { score: bestScore, bestMove };
};

export const minimax = (
  board: Board,
  player: GameTurn,
  isMaximizingPlayer: boolean,
  useAlphaBetaPruning: boolean,
  alpha = -Infinity,
  beta = Infinity,
  depth = 0,
) => {
  const track = { iterationCount: 0 };

  const result = _minimax(
    board.map((row) => [...row]),
    player,
    isMaximizingPlayer,
    useAlphaBetaPruning,
    alpha,
    beta,
    depth,
    track,
  );

  console.log(
    `%cIteration Count %c[Alpha/Beta Pruning]: %c${track.iterationCount}`,
    "color: black",
    `color: ${useAlphaBetaPruning ? "green" : "red"}`,
    "color: gray",
  );

  return result;
};
