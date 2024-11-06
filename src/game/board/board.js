import React, { useState, useEffect, useCallback } from "react";
import Popup from "reactjs-popup";

import Square from "./square/square";
import PopupComponent from "./popup/popup";

function Board({ mode, isFirst, difficulty }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(isFirst ? isFirst : true);
  const [open, setOpen] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [draw, setDraw] = useState(0);

  const handleClick = useCallback(
    (index) => {
      if (squares[index] || calculateWinner(squares) || isComputerTurn) return;

      const newSquares = squares.slice();
      newSquares[index] = isXNext ? "X" : "O";
      setSquares(newSquares);
      setIsXNext(!isXNext);

      if (calculateWinner(newSquares) || !newSquares.includes(null)) {
        setOpen(true);
      }
    },
    [squares, isXNext, isComputerTurn]
  );

  useEffect(() => {
    if (mode === "PVE" && isXNext !== isFirst && !calculateWinner(squares)) {
      setIsComputerTurn(true);

      const timedelay = Math.floor(Math.random() * (3000 - 1000)) + 1000;
      setTimeout(() => {
        //độ khó dễ thì dùng random khó thì dùng minimax
        if (!difficulty) {
          const emptySquares = squares
            .map((sq, idx) => (sq === null ? idx : null))
            .filter((idx) => idx !== null);

          if (emptySquares.length > 0) {
            const randomIndex =
              emptySquares[Math.floor(Math.random() * emptySquares.length)];
            handleClick(randomIndex);
          }
        } else {          
          const aiPlayer = isFirst ? "O" : "X";
          const humanPlayer = isFirst ? "X" : "O";
          const bestMove = findBestMove(squares, aiPlayer, humanPlayer);

          if (bestMove !== null) {
            handleClick(bestMove);
          }
        }
        setIsComputerTurn(false);
      }, timedelay);
    }
  }, [isXNext, handleClick, isFirst, mode, squares, difficulty]);

  const handleClosePopup = () => {
    if (winner) {
      if (!isXNext) {
        let _xScore = xScore + 1;
        setXScore(_xScore);
      } else {
        let _oScore = oScore + 1;
        setOScore(_oScore);
      }
    } else {
      let _draw = draw + 1;
      setDraw(_draw);
    }
    setOpen(false);
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  function renderSquare(index) {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  }

  const winner = calculateWinner(squares);
  const status = `Tới lượt của ${isXNext ? "X" : "O"}`;

  return (
    <>
      <Popup open={open} onClose={handleClosePopup} position="right center">
        <PopupComponent value={winner} />
      </Popup>

      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold mb-4">{status}</div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {squares.map((_, idx) => renderSquare(idx))}
        </div>

        <div className="text-xl font-semibold mb-4">
          Số chiến thắng của X: {xScore}
        </div>
        <div className="text-xl font-semibold mb-4">
          Số chiến thắng của O: {oScore}
        </div>
        <div className="text-xl font-semibold">Số trận hòa: {draw}</div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function minimax(squares, depth, isMaximizing, aiPlayer, humanPlayer) {
  const winner = calculateWinner(squares);
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (!squares.includes(null)) return 0; 
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = aiPlayer;
        const score = minimax(squares, depth + 1, false, aiPlayer, humanPlayer);
        squares[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = humanPlayer;
        const score = minimax(squares, depth + 1, true, aiPlayer, humanPlayer);
        squares[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function findBestMove(squares, aiPlayer, humanPlayer) {
  let bestScore = -Infinity;
  let bestMove = null;

  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      squares[i] = aiPlayer;
      const score = minimax(squares, 0, false, aiPlayer, humanPlayer);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

export default Board;
