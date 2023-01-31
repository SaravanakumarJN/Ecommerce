import React from 'react';
import styles from './CartItem.module.css';

const CartItem = ({ data, handleDelete, handleQuantityChange, isUpdating }) => {
  const { productId, quantity, _id } = data;

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img
          src='https://via.placeholder.com/160?text=Product+Image'
          alt='Product img'
        ></img>
      </div>
      <div className={styles.content}>
        <div>{productId.name}</div>
        <div className={styles.prodtag}>{productId.specification}</div>
        <div className={styles.quantity_selector}>
          <button
            disabled={isUpdating}
            onClick={() => handleQuantityChange(-1, data)}
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            disabled={isUpdating}
            onClick={() => handleQuantityChange(1, data)}
          >
            +
          </button>
        </div>
        <div>Rs. {productId.price} / piece</div>
        <button className={styles.removeBtn} onClick={() => handleDelete(_id)}>
          Remove Item
        </button>
      </div>
    </div>
  );
};

export { CartItem };
