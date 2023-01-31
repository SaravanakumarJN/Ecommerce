import React from 'react';
import styles from './PriceDetails.module.css';

const PriceDetails = ({ userCartData, handlePlaceOrder }) => {
  const TotalMRP = userCartData?.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);
  const Discount = 0;
  const ConvienceFee = TotalMRP > 1000 ? 0 : Math.ceil(TotalMRP * 0.08);
  const TotalAmount = TotalMRP - Discount + ConvienceFee;

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.flex}>
          <div>Total MRP</div>
          <div className={styles.flexgrow}></div>
          <div>Rs.{TotalMRP}</div>
        </div>
        <div className={styles.flex}>
          <div>Discont</div>
          <div className={styles.flexgrow}></div>
          <div>- Rs.{Discount}</div>
        </div>
        <div className={styles.flex}>
          <div>Convenience Fee ({TotalMRP > 1000 ? '0%' : '0.8%'})</div>
          <div className={styles.flexgrow}></div>
          <div>Rs.{ConvienceFee}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.flex}>
          <div>
            <strong>Total Amount</strong>
          </div>
          <div className={styles.flexgrow}></div>
          <div>
            <strong>Rs.{TotalAmount}</strong>
          </div>
        </div>
        <button onClick={handlePlaceOrder} className={styles.addBtn}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export { PriceDetails };
