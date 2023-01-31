import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Product.module.css';
import {
  addProductToCart,
  getProductById,
} from '../../utilities/networkRequests';
import { TOAST } from '../../utilities/toast';
import { useAtom } from 'jotai/react';
import { userAtom } from '../../store/userStore';

const Product = () => {
  const [productData, setProductData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [userData] = useAtom(userAtom);
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((error) => {
        history.push('/');
        if (error.response) {
          TOAST(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
        } else {
          TOAST(error.message);
        }
      });
  }, []);

  const handleQuantityChange = (change) => {
    if (quantity + change < 0) {
      return;
    }
    setQuantity((prev) => prev + change);
  };

  const handleAddToCart = () => {
    const payload = {
      quantity,
      productId: id,
    };

    if (!userData.isLoggedIn) {
      history.push('/login');
      TOAST('Please login');
    } else if (quantity <= 0) {
      TOAST('Please add quantity');
    } else {
      addProductToCart(payload)
        .then((res) => {
          if (!res.error) {
            TOAST('Product added to cart successfully');
          }
        })
        .catch((error) => {
          if (error.response) {
            TOAST(
              error.response.data.message
                ? error.response.data.message
                : error.response.data
            );
          } else {
            TOAST(error.message);
          }
        });
    }
  };

  const { name, price, specification } = productData;
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img
          width='200px'
          height='200px'
          src='https://via.placeholder.com/200?text=Product+Image'
          alt='Product Img'
        ></img>
        <img
          width='200px'
          height='200px'
          src='https://via.placeholder.com/200?text=Product+Image'
          alt='Product Img'
        ></img>
        <img
          width='200px'
          height='200px'
          src='https://via.placeholder.com/200?text=Product+Image'
          alt='Product Img'
        ></img>
        <img
          width='200px'
          height='200px'
          src='https://via.placeholder.com/200?text=Product+Image'
          alt='Product Img'
        ></img>
      </div>
      <div className={styles.content}>
        <h2>{name}</h2>
        <p>{specification}</p>
        <h3>Rs. {price}</h3>
        <div className={styles.quantity_selector}>
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <div>{quantity}</div>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <button className={styles.addBtn} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export { Product };
