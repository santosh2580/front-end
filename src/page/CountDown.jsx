import React, { useState, useEffect } from "react";
import { useMyGame } from "../hooks/GameProvider";

const CountDown = () => {
  const { timeRemains, dispatch } = useMyGame(); // Initial time from the game context
  const [gameTime, setGameTime] = useState(timeRemains);

  useEffect(() => {
    // Only start countdown if timeRemains is positive
    if (gameTime > 0) {
      const timer = setInterval(() => {
        setGameTime((prevTime) => Math.max(prevTime - 1, 0)); // Decrement and ensure non-negative
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }

    // If time is up (gameTime is 0), dispatch the timeout action
    if (gameTime === 0) {
      dispatch({ type: "timeout" });
    }
  }, [gameTime, dispatch]);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="rounded-lg border border-gray-300 bg-white p-8 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Time Remaining
          </h2>
          <div className="border-b border-t border-gray-200 py-4 font-mono text-4xl text-blue-600">
            {formatTime(gameTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
