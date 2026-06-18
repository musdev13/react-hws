import Header, { type MenuItem } from './components/Header';
import Main from './components/Main';
import { type CardItem } from './components/Card';
import './App.css';

function App() {
  const menuItems: MenuItem[] = [
    { id: "1", label: "Головна", link: "/" },
    { id: "2", label: "Каталог", link: "#catalog" },
    { id: "3", label: "Про нас", link: "#about" },
    { id: "4", label: "Контакты", link: "#contacts" },
  ];

  const cardItems: CardItem[] = [
    {
      id: "1",
      title: "Бездротові навушники",
      price: 2999,
      description: "Чудовий звук та активне шумозаглушення.",
      isSale: true,
      isNew: false
    },
    {
      id: "2",
      title: "Смарт-годинник",
      price: 4500,
      description: "Моніторинг здоров'я та крокомір.",
      isSale: false,
      isNew: true
    },
    {
      id: "3",
      title: "Портативна колонка",
      price: 1800,
      description: "Вологозахист IPX7 та 12 годин автономної роботи.",
      isSale: true,
      isNew: true
    },
  ];

  const isLoggedIn = true;
  const username = "Musek";
  const isOnline = true;

  return (
    <div className="app-container">
      <Header 
        menuItems={menuItems} 
        isLoggedIn={isLoggedIn} 
        username={username} 
        isOnline={isOnline} 
      />
      <Main cardItems={cardItems} />
    </div>
  );
}

export default App;