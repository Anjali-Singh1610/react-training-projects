import { useState, useEffect } from "react";
import "./App.css";

type Bubble = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
};

const COLORS = ["yellow", "green", "blue"];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createInitialBubbles() {
  const initialBubbles: Bubble[] = [];
  for (let i = 0; i < 30; i++) {
    initialBubbles.push({
      id: i,
      x: getRandomNumber(0, window.innerWidth - 80),
      y: getRandomNumber(0, window.innerHeight - 80),
      color: getRandomColor(),
      size: getRandomNumber(40, 80),
    });
  }
  return initialBubbles;
}

function App() {
  const [bubbles, setBubbles] = useState<Bubble[]>(createInitialBubbles);
  const [shootCount, setShootCount] = useState(0);
  const [time, setTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev.map((bubble) => ({
          ...bubble,
          x: Math.max(
            0,
            Math.min(
              window.innerWidth - bubble.size,
              bubble.x + getRandomNumber(-20, 20)
            )
          ),
          y: Math.max(
            0,
            Math.min(
              window.innerHeight - bubble.size,
              bubble.y + getRandomNumber(-20, 20)
            )
          ),
        }))
      );
    }, 300);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  function handleBubbleClick(id: number, color: string) {
    if (!isRunning) return;

    if (color === "yellow") {
      setBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === id ? { ...bubble, color: "blue" } : bubble
        )
      );
      setShootCount((prev) => prev + 1);
    }
  }

  function startGame() {
    setIsRunning(true);
  }

  function resetGame() {
    setBubbles(createInitialBubbles());
    setShootCount(0);
    setTime(60);
    setIsRunning(false);
  }

  return (
    <div className="game-container">
      
      <div className="score-left">
        Shoot Count: {shootCount}
      </div>

      <div className="timer-right">
        Time: {time}s
      </div>

      <div className="controls">
        <button onClick={startGame}>Start</button>
        <button onClick={resetGame}>Reset</button>
      </div>

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
          }}
          onClick={() => handleBubbleClick(bubble.id, bubble.color)}
        />
      ))}
    </div>
  );
}

export default App;