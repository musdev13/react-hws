import React from "react";

interface GameLayoutProps {
  headerSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  timerSlot: React.ReactNode;
  boardSlot: React.ReactNode;
  controlsSlot: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  headerSlot,
  statusSlot,
  timerSlot,
  boardSlot,
  controlsSlot,
}) => {
  return (
    <div className="game">
      {headerSlot}
      {statusSlot}
      {timerSlot}
      {boardSlot}
      {controlsSlot}
    </div>
  );
};