import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  link: string;
}

interface HeaderProps {
  menuItems: MenuItem[];
  isLoggedIn: boolean;
  username: string;
  isOnline: boolean;
}

const Header: React.FC<HeaderProps> = ({ menuItems, isLoggedIn, username, isOnline }) => {
  return (
    <header className="header">
      <div className="logo">TechStore</div>
      
      <div className="status-container">
        <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
        <span>{isOnline ? 'Онлайн' : 'Офлайн'}</span>
      </div>

      <nav className="nav">
        {menuItems.map((item) => (
          <a key={item.id} href={item.link} className="nav-item">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="auth-block">
        {isLoggedIn ? (
          <div className="user-profile">
            <span>Вітаємо, {username}!</span>
            <button type="button" className="btn-auth">Вийти</button>
          </div>
        ) : (
          <button type="button" className="btn-auth">Увійти</button>
        )}
      </div>
    </header>
  );
};

export default Header;