import Counter from './components/Counter';
import ThemeToggler from './components/ThemeToggler';
import { useTheme } from './context/ThemeContext';
import './App.css';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme === 'dark' ? 'dark-app' : 'light-app'}`}>
      <header className="app-header">
        <div className="header-content">
          <h1>лічільнік</h1>
          <ThemeToggler />
        </div>
      </header>
      
      <main className="counters-layout">
        <Counter title="існівній лічільнік" />
        <Counter title="дрігій лічільнік" />
      </main>
    </div>
  );
}

export default App;