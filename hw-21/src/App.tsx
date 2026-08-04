import { useEffect, useCallback } from "react";
import { Cell } from "./components/Cell";
import { Status } from "./components/Status";
import { TitleGame } from "./components/TitleGame";
import { BoardRenderer } from "./components/BoardRenderer";
import { GameLayout } from "./components/GameLayout";
import { Timer } from "./components/Timer";
import { useTheme } from "./context/ThemeContext";
import useGame from "./hooks/useGame";

function App() {
  const {
    cells,
    currentPlayer,
    winner,
    winnerCombination,
    isDraw,
    handleCellClick,
    handleReset,
    resetSignal,
  } = useGame();

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const renderCell = useCallback(
    (cell: typeof cells[number], index: number) => (
      <Cell
        value={cell}
        key={index}
        onCellClick={() => handleCellClick(index)}
        isWinner={winnerCombination.includes(index)}
      />
    ),
    [handleCellClick, winnerCombination]
  );

  return (
    <GameLayout
      headerSlot={
        <>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "Темна тема 🌙" : "Світла тема ☀️"}
          </button>
          <TitleGame title="Гра хрестики нулики" />
        </>
      }
      statusSlot={
        <Status player={currentPlayer} winner={winner} isDraw={isDraw} />
      }
      timerSlot={
        <Timer isGameOver={Boolean(winner || isDraw)} resetSignal={resetSignal} />
      }
      boardSlot={<BoardRenderer items={cells} renderItem={renderCell} />}
      controlsSlot={
        <button className="reset" onClick={handleReset}>
          Скинути гру
        </button>
      }
    />
  );
}

export default App;