// src/Square.js
import React from "react";

function PopupComponent({ value, onClick }) {
  return (
    <div className="px-8 py-4 border rounded  text-white bg-orange-200">
      {value ? `${value} thắng` : "Đây là trận hòa"}
    </div>
  );
}

export default PopupComponent;
