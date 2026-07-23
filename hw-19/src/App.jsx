import Counter from './Counter';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <h1>React Counter App</h1>
      <div className="counters-wrapper">
        <Counter title="Лічильник 1" />
        <Counter title="Лічильник 2" />
      </div>
    </div>
  );
}