import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai/react';

import styles from './Home.module.css';
import {
  getCategory,
  getProductByCategory,
  getProducts,
} from '../../utilities/networkRequests';
import { TOAST } from '../../utilities/toast';
import { productsAtom } from '../../store/productStore';
import { CardItem } from '../CardItem/CardItem';

const Home = () => {
  const [products, setProducts] = useAtom(productsAtom);
  const [categoryData, setCategoryData] = useState([]);
  const [filterBy, setFilterBy] = useState('Relevance');

  const handleSelect = (e) => {
    let { value } = e.target;

    setFilterBy(value);
  };

  const handleGetProducts = () => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
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

  const handleGetCategory = () => {
    getCategory()
      .then((res) => {
        setCategoryData(res.data);
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

  const hanldeGetProductsByCategoryId = (filterBy) => {
    getProductByCategory(filterBy)
      .then((res) => {
        setProducts(res.data);
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

  useEffect(() => {
    handleGetProducts();
    handleGetCategory();
  }, []);

  useEffect(() => {
    if (filterBy === 'Relevance') {
      handleGetProducts();
    } else {
      hanldeGetProductsByCategoryId(filterBy);
    }
  }, [filterBy]);

  return (
    <div className={styles.container}>
      <div className={styles.utils_container}>
        <div>
          <div>Filter By</div>
          <select onChange={handleSelect}>
            <option defaultValue>Relevance</option>
            {categoryData?.map((e, i) => (
              <option value={e._id} key={i}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.product_container}>
        {products?.map((ele, i) => {
          return <CardItem key={i} item={ele} />;
        })}
      </div>
    </div>
  );
};

export { Home };
