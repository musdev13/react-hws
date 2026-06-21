import { useState, useEffect } from "react";
import type { BoardState, Player, WinResult, GameStats } from "../types";

const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(currentBoard: BoardState): WinResult | null {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (
      currentBoard[a] &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    ) {
      return {
        winner: currentBoard[a] as Player,
        combination,
      };
    }
  }
  return null;
}

export default function useGame() {
  const [cells, setCells] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [seconds, setSeconds] = useState(0);

  const [stats, setStats] = useState<GameStats>(() => {
    const savedStats = localStorage.getItem("tic-tac-toe-stats");
    return savedStats
      ? JSON.parse(savedStats)
      : { xWins: 0, oWins: 0, draws: 0 };
  });

  const [isGameTracked, setIsGameTracked] = useState(false);

  const winnerResult = checkWinner(cells);
  const winner = winnerResult ? winnerResult.winner : null;
  const winnerCombination = winnerResult ? winnerResult.combination : [];
  const isDraw = !winner && cells.every((cell) => cell != null);

  useEffect(() => {
    if (winner || isDraw) return;
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [winner, isDraw]);

  useEffect(() => {
    localStorage.setItem("tic-tac-toe-stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    if (isGameTracked) return;

    if (winner) {
      setStats((prev) => ({
        ...prev,
        xWins: winner === "X" ? prev.xWins + 1 : prev.xWins,
        oWins: winner === "O" ? prev.oWins + 1 : prev.oWins,
      }));
      setIsGameTracked(true);
    } else if (isDraw) {
      setStats((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));
      setIsGameTracked(true);
    }
  }, [winner, isDraw, isGameTracked]);

  const handleCellClick = (index: number): void => {
    if (cells[index] || winner || isDraw) {
      return;
    }

    const newCells = [...cells];
    newCells[index] = currentPlayer;
    setCells(newCells);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setCells(Array(9).fill(null));
    setSeconds(0);
    setIsGameTracked(false);
    if (winner) {
      setCurrentPlayer(winner === "X" ? "O" : "X");
    }
  };

  const handleResetStats = () => {
    setStats({ xWins: 0, oWins: 0, draws: 0 });
  };

  return {
    cells,
    currentPlayer,
    winner,
    winnerCombination,
    isDraw,
    handleCellClick,
    handleReset,
    seconds,
    stats,
    handleResetStats,
  };
}