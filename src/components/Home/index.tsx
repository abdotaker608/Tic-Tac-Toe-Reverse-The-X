import React from "react";
import "./styles/index.scss";
import { useGame } from "@/provider/GameProvider";

const Home = () => {
  const { startGame } = useGame();

  return (
    <div className="home">
      <h1 className="home__title">Tic Tac Toe - Only X</h1>
      <div className="home__button-container">
        <button onClick={startGame}>START THE GAME!!!</button>
      </div>
    </div>
  );
};

export default Home;
