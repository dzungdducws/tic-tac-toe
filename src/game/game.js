import React, { useState } from "react";
import Board from "./board/board";

function Game() {
  const [mode, setMode] = useState(null);
  const [isFirst, setIsFirst] = useState(null);

  function selectMode(selectedMode) {
    setMode(selectedMode);
  }

  function selectedFirst(selectedFirst) {
    setIsFirst(selectedFirst);
  }

  function resetMode() {
    setIsFirst(null);
    setMode(null);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!mode ? (
        <div className="mode-selection flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold ">Chọn Chế Độ Chơi</h2>
          <button
            onClick={() => selectMode("PVP")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Chơi Với Người
          </button>
          <button
            onClick={() => {
              selectMode("PVE");
              selectedFirst(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Chơi Với Máy (Người chơi đi trước)
          </button>
          <button
            onClick={() => {
              selectMode("PVE");
              selectedFirst(false);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Chơi Với Máy (Máy chơi đi trước)
          </button>
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
            <Board mode={mode} isFirst={isFirst} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
