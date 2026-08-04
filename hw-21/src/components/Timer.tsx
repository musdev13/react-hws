import { memo, useEffect, useState } from "react";

const formatTime = (timeInSeconds: number): string => {
  const mins = Math.floor(timeInSeconds / 60);
  const secs = timeInSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

interface TimerProps {
  isGameOver: boolean;
  resetSignal: number;
}

export const Timer = memo(function Timer({ isGameOver, resetSignal }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [resetSignal]);

  useEffect(() => {
    if (isGameOver) return;

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver]);

  return <div className="timer"> Час гри: {formatTime(seconds)}</div>;
});