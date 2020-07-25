import React, { useState, useRef } from "react";
import "./App.css";

export const App = () => {
  const [title, setTitle] = useState("LET THE COUNTDOWN BEGIN");
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const timerIdRef = useRef(null);

  const startTimer = () => {
    if (timerIdRef.current !== null) return;

    setTitle("You're doing grate");
    setIsRunning(true);

    timerIdRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          return timeLeft - 1;
        }
        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIdRef.current === null) return;

    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
    setTitle("Keep it up");
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
    setTitle("Raedy to go another round?");
    setTimeLeft(10 * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft - minutes * 60).toString().padStart(2, "0");

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};
