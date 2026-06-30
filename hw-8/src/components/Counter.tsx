import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface CounterProps {
  title: string;
}

const Counter: React.FC<CounterProps> = ({ title }) => {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [isRedColor, setIsRedColor] = useState<boolean>(false);
  const { theme } = useTheme();

  const updateCounter = (newValue: number) => {
    setCount(newValue);
    setHistory((prevHistory) => [newValue, ...prevHistory].slice(0, 5));
  };

  const handleIncrement = () => updateCounter(count + 1);
  const handleDecrement = () => updateCounter(count - 1);
  const handleReset = () => updateCounter(0);
  const handleToggleColor = () => setIsRedColor(!isRedColor);

  return (
    <div className={`counter-box ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <h2 className={theme === 'dark' ? 'dark-text' : 'light-text'}>{title}</h2>
      
      <div className={`counter-display ${isRedColor ? 'text-red' : 'text-blue'}`}>
        {count}
      </div>

      <div className="button-group">
        <button type="button" className={`btn btn-decrement ${theme === 'dark' ? 'dark-btn' : 'light-btn'}`} onClick={handleDecrement}>-</button>
        <button type="button" className={`btn btn-increment ${theme === 'dark' ? 'dark-btn' : 'light-btn'}`} onClick={handleIncrement}>+</button>
      </div>

      <div className="action-group">
        <button type="button" className={`btn-action btn-reset ${theme === 'dark' ? 'dark-btn-action' : 'light-btn-action'}`} onClick={handleReset}>Скініті</button>
        <button type="button" className={`btn-action btn-toggle ${theme === 'dark' ? 'dark-btn-action' : 'light-btn-action'}`} onClick={handleToggleColor}>Змініті кілір</button>
      </div>

      <div className="history-section">
        <h3 className={theme === 'dark' ? 'dark-text' : 'light-text'}>Істірія змін (істінні 5):</h3>
        {history.length === 0 ? (
          <p className={`empty-history ${theme === 'dark' ? 'dark-text' : 'light-text'}`}>Істірія піріжня</p>
        ) : (
          <ul className="history-list">
            {history.map((val, index) => (
              <li key={index} className={`history-item ${theme === 'dark' ? 'dark-history-item' : 'light-history-item'}`}>Знічіння: {val}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Counter;