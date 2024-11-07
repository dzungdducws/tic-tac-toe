import React, { useState } from "react";
import Board from "./board/board";

function Game() {
  const [mode, setMode] = useState(null);
  const [isFirst, setIsFirst] = useState(null);
  const [difficulty, setDifficulty] = useState(null); // Thêm state cho độ khó

  function selectMode(selectedMode) {
    setMode(selectedMode);
  }

  function selectedFirst(selectedFirst) {
    setIsFirst(selectedFirst);
  }

  function resetMode() {
    setIsFirst(null);
    setMode(null);
    setDifficulty(null);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!mode ? (
        <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold">Chọn Chế Độ Chơi</h2>
          <button
            onClick={() => selectMode("PVP")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Chơi Với Người
          </button>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Chơi Với Máy</h3>
            <button
              onClick={() => {
                selectMode("PVE");
                selectedFirst(true);
                setDifficulty(false);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Người chơi đi trước - Dễ
            </button>
            <button
              onClick={() => {
                selectMode("PVE");
                selectedFirst(true);
                setDifficulty(true);
              }}
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
              Người chơi đi trước - Khó
            </button>
            <button
              onClick={() => {
                selectMode("PVE");
                selectedFirst(false);
                setDifficulty(false);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Máy chơi đi trước - Dễ
            </button>
            <button
              onClick={() => {
                selectMode("PVE");
                selectedFirst(false);
                setDifficulty(true);
              }}
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
              Máy chơi đi trước - Khó
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={resetMode}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            Quay lại
          </button>
          <div className="game-board">
            <Board
              param={{ mode: mode, isFirst: isFirst, difficulty: difficulty }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
