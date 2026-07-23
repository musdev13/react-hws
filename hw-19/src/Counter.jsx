import { useState } from 'react';

export default function Counter({ title }) {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [isColored, setIsColored] = useState(false);

  const updateCount = (newValue) => {
    setCount(newValue);
    setHistory((prevHistory) => [newValue, ...prevHistory].slice(0, 5));
  };

  const handleIncrement = () => updateCount(count + 1);
  const handleDecrement = () => updateCount(count - 1);
  const handleReset = () => updateCount(0);
  const toggleColor = () => setIsColored((prev) => !prev);

  return (
    <div className={`counter-card ${isColored ? 'colored' : ''}`}>
      <h2>{title}</h2>
      <div className="count-display">{count}</div>
      <div className="controls">
        <button onClick={handleDecrement}>-1</button>
        <button onClick={handleIncrement}>+1</button>
        <button onClick={handleReset} className="reset-btn">Скинути</button>
        <button onClick={toggleColor} className="toggle-btn">Змінити колір</button>
      </div>
      <div className="history">
        <h3>Історія (останні 5):</h3>
        {history.length === 0 ? (
          <p>Історія порожня</p>
        ) : (
          <ul>
            {history.map((val, index) => (
              <li key={index}>{val}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}