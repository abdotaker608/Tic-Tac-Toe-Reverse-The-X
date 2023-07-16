import React from "react";
import "./styles/index.scss";
import Board from "../Board";
import Configuration from "../Configuration";
import Announcement from "../Announcement";

const Game = () => {
  return (
    <div className="game">
      <Configuration />
      <div style={{ position: "relative" }}>
        <Announcement />
        <Board />
      </div>
    </div>
  );
};

export default Game;
