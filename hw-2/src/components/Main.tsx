import React from 'react';
import Card, { type CardItem } from './Card';

interface MainProps {
  cardItems: CardItem[];
}

const Main: React.FC<MainProps> = ({ cardItems }) => {
  return (
    <main className="main-content">
      <section className="catalog-hero">
        <h1>Каталог товарів</h1>
        <p>Обирайте найкращі девайси за вигідними цінами з гарантією якості</p>
      </section>
      
      <div className="cards-grid">
        {cardItems.map((card) => (
          <Card key={card.id} item={card} />
        ))}
      </div>
    </main>
  );
};

export default Main;