
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Sidebar />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;