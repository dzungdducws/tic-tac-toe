import React from "react";

function Square({ value, onClick, isDisabled }) {
  return (
    <button
      disabled={isDisabled}
      className="w-20 h-20 bg-gray-200 text-3xl font-bold flex items-center justify-center hover:bg-gray-300"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
