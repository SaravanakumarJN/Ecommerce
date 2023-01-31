import React, { useEffect, useState } from 'react';
import {
  getUserCartDetails,
  placeOrder,
  updateProductInCart,
} from '../../utilities/networkRequests';
import { useAtom } from 'jotai/react';
import { userCartAtom } from '../../store/userStore';
import { TOAST } from '../../utilities/toast';
import styles from './Cart.module.css';
import { CartItem } from '../CartItem/CartItem';
import { PriceDetails } from '../PriceDetails/PriceDetails';
import { deleteProductFromCart } from '../../utilities/networkRequests';

const Cart = () => {
  const [userCartData, setUserCartData] = useAtom(userCartAtom);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleQuantityChange = (change, data) => {
    let updatedQuantity = data.quantity + change;
    if (updatedQuantity < 0) {
      return;
    }

    if (!isUpdating) {
      setIsUpdating(true);
      const payload = {
        quantity: updatedQuantity,
      };
      updateProductInCart(data._id, payload)
        .then((res) => {
          if (!res.error) {
            handleGetUserCartDetails();
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
        })
        .finally(() => {
          setIsUpdating(false);
        });
    }
  };

  const handleDelete = (id) => {
    deleteProductFromCart(id)
      .then((res) => {
        if (!res.error) {
          handleGetUserCartDetails();
          TOAST('Deleted Successfully');
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
  };

  const handleGetUserCartDetails = () => {
    getUserCartDetails()
      .then((res) => {
        if (!res.error) {
          setUserCartData(res.data);
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
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);

    if (!isPlacingOrder) {
      placeOrder()
        .then((res) => {
          if (!res.error) {
            TOAST('Order placed successfully');
            handleGetUserCartDetails();
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
        })
        .finally(() => {
          setIsPlacingOrder(false);
        });
    }
  };

  useEffect(() => {
    handleGetUserCartDetails();
  }, []);

  return userCartData.length === 0 ? (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>Cart is Empty</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.cartList}>
        {userCartData?.map((e) => {
          return (
            <CartItem
              key={e.id}
              data={e}
              handleDelete={handleDelete}
              handleQuantityChange={handleQuantityChange}
              isUpdating={isUpdating}
            />
          );
        })}
      </div>
      <div className={styles.costDetails}>
        <h3>Payment Details</h3>
        <PriceDetails
          userCartData={userCartData}
          handlePlaceOrder={handlePlaceOrder}
        ></PriceDetails>
      </div>
    </div>
  );
};

export { Cart };
