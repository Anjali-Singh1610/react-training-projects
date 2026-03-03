import React, { useState } from "react";
import car from "./assets/car.png";

const CarAnimation: React.FC = () => {
  const [move, setMove] = useState(false);

  const handleMove = () => {
    setMove(!move);
  };

  return (
    <div className="car-container">
      <h2>Car Animation</h2>

      <div className="road">
        <img
          src={car}
          alt="car"
          className={`car ${move ? "move" : ""}`}
        />
      </div>

      <button className="start-btn" onClick={handleMove}>
        {move ? "Reset Car" : "Start Car"}
      </button>
    </div>
  );
};

export default CarAnimation;