import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>лічiльнiк</h1>
      </header>
      
      <main className="counters-layout">
        <Counter title="основнiй лічiльнiк" />
        <Counter title="другiй лічiльнiк" />
      </main>
    </div>
  );
}

export default App;