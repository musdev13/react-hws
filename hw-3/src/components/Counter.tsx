import React, { useState } from 'react';

interface CounterProps {
  title: string;
}

const Counter: React.FC<CounterProps> = ({ title }) => {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [isRedColor, setIsRedColor] = useState<boolean>(false);

  const updateCounter = (newValue: number) => {
    setCount(newValue);
    setHistory((prevHistory) => [newValue, ...prevHistory].slice(0, 5));
  };

  const handleIncrement = () => updateCounter(count + 1);
  const handleDecrement = () => updateCounter(count - 1);
  const handleReset = () => updateCounter(0);
  const handleToggleColor = () => setIsRedColor(!isRedColor);

  return (
    <div className="counter-box">
      <h2>{title}</h2>
      
      <div className={`counter-display ${isRedColor ? 'text-red' : 'text-blue'}`}>
        {count}
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-decrement" onClick={handleDecrement}>-</button>
        <button type="button" className="btn btn-increment" onClick={handleIncrement}>+</button>
      </div>

      <div className="action-group">
        <button type="button" className="btn-action btn-reset" onClick={handleReset}>Скiнутi</button>
        <button type="button" className="btn-action btn-toggle" onClick={handleToggleColor}>Змінiтi колір</button>
      </div>

      <div className="history-section">
        <h3>Історія змін (останні 5):</h3>
        {history.length === 0 ? (
          <p className="empty-history">Історія порожня</p>
        ) : (
          <ul className="history-list">
            {history.map((val, index) => (
              <li key={index} className="history-item">Значення: {val}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Counter;