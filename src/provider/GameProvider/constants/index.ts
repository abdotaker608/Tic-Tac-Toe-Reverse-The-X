import { Board } from "@/types";
import { GameMoves } from "../types";

export const initialBoard = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
] as Board;

export const initialMoves = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
] as GameMoves;
