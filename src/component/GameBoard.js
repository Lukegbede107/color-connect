import React, { useEffect, useState } from "react";
import GameCircle from "./GameCircle";
import Header from "./header";
import Footer from "./footer";
import "../Game.css";
import { isDraw, isWinner, getComputerMove } from "../Helper";
import {
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  GAME_STATE_DRAW,
  PLAYER_1,
  PLAYER_2,
  NO_CIRCLES,
  NO_PLAYER,
} from "../Constants";
// import { useEffect } from "react/cjs/react.development";

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);



  const initGames = () => {
    setCurrentPlayer(PLAYER_1);
    setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
    setGameState(GAME_STATE_PLAYING)
  }


  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  };

  
  // const suggestMove = () => {
  //   circleClicked(getComputerMove(gameBoard));
  // }
  
  const circleClicked = (id) => {
    console.log("circle clicked:" + id,);

    if (gameBoard[id] !== NO_PLAYER) return;
    if (gameState !== GAME_STATE_PLAYING) return;

    if (isWinner(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN);
      setCurrentPlayer(currentPlayer);
    }

    if (isDraw(gameBoard, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW);
      setCurrentPlayer(NO_PLAYER);
    }

    /*const board = [...gameBoard];
        gameBoard[id] = currentPlayer;
        setGameBoard(gameBoard);*/

    setGameBoard((prev) => {
      return prev.map((circle, pos) => {
        if (pos === id) return currentPlayer;
        return circle;
      });
    });

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    console.log(gameBoard);
  };
  const renderCircle = (id) => {
    return (
      <GameCircle
        key={id}
        id={id}
        className={`player_${gameBoard[id]}`}
        onCircleClicked={circleClicked}
      />
    );
  };
  const onSuggestClick = () =>{
    circleClicked(getComputerMove(gameBoard));
  }

  const onNewGameClick = () =>{
    initGames();
  }
  return (
    <>
      <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>

      <div className="gameBoard">{initBoard()}</div>
      <Footer onNewGameClick={onNewGameClick}  onSuggestClick = {onSuggestClick} gameState={gameState}/>
    </>
  );
};

export default GameBoard;
