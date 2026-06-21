import { Cell } from "./components/Cell";
import { Status } from "./components/Status";
import { TitleGame } from "./components/TitleGame";
import useGame from "./hooks/useGame";

const formatTime = (timeInSeconds: number): string => {
  const mins = Math.floor(timeInSeconds / 60);
  const secs = timeInSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

function App() {
  const {
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
  } = useGame();

  return (
    <div className="game" id="game">
      <TitleGame title="Гра хрестики нулики" age={20} />
      <Status player={currentPlayer} winner={winner} isDraw={isDraw} />
      <div className="timer">Час гри: {formatTime(seconds)}</div>
      
      <div className="board">
        {cells.map((cell, index) => (
          <Cell
            value={cell}
            key={index}
            onCellClick={() => handleCellClick(index)}
            isWinner={winnerCombination.includes(index)}
          />
        ))}
      </div>

      <div className="actions">
        <button className="btn reset" onClick={handleReset}>
          Скинути гру
        </button>
      </div>

      {/* Новий блок статистики */}
      <div className="stats-container">
        <h3>Статистика ігор</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label x-color">Перемоги X</span>
            <span className="stat-value">{stats.xWins}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label draw-color">Нічиї</span>
            <span className="stat-value">{stats.draws}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label o-color">Перемоги O</span>
            <span className="stat-value">{stats.oWins}</span>
          </div>
        </div>
        <button className="btn reset-stats" onClick={handleResetStats}>
          Скинути статистику
        </button>
      </div>
    </div>
  );
}

export default App;