import React from 'react';

export interface CardItem {
  id: string;
  title: string;
  price: number;
  description: string;
  isSale: boolean;
  isNew?: boolean;
}

interface CardProps {
  item: CardItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const { isNew = false } = item;

  return (
    <div className="card">
      {item.isSale && <span className="badge badge-sale">SALE</span>}
      {isNew && <span className="badge badge-new">NEW</span>}
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="price">{item.price} UAH</div>
    </div>
  );
};

export default Card;