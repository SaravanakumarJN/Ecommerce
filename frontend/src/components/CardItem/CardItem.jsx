import React from 'react';
import styles from './CardItem.module.css';
import { useHistory } from 'react-router-dom';

const CardItem = ({ item }) => {
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/product/${item._id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div>
        <img
          width='170px'
          height='170px'
          src={
            item.image
              ? item.image
              : 'https://via.placeholder.com/140?text=Product+Image'
          }
          alt='Product img'
        ></img>
      </div>
      <div>{item.name}</div>
      <div className={styles.description}>{item.specification}</div>
      <div>Rs. {item.price}</div>
    </div>
  );
};

export { CardItem };
