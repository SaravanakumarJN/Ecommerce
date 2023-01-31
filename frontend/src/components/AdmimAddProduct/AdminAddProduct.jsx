import React, { useEffect, useState } from 'react';
import styles from './AdminAddProduct.module.css';
import { useHistory, useParams } from 'react-router-dom';
import {
  addProduct,
  getCategory,
  getProductById,
  updateProduct,
} from '../../utilities/networkRequests';
import { TOAST } from '../../utilities/toast';

const initialForm = {
  name: '',
  price: '',
  quantity: '',
  specification: '',
};

const AdminAddProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState('');
  const { name, price, quantity, specification } = form;
  let { id } = useParams();
  let history = useHistory();

  const handleForm = (e) => {
    let { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSelect = (e) => {
    let { value } = e.target;

    setCategory(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      price,
      quantity,
      specification,
      categoryId: category,
    };

    if (id) {
      updateProduct(payload, id)
        .then((res) => {
          if (!res.error) {
            TOAST('Product Updated Successfully');
            history.push('/admin-dashboard');
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
    } else {
      addProduct(payload)
        .then((res) => {
          if (!res.error) {
            TOAST('Product Added Successfully');
            history.push('/admin-dashboard');
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

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((res) => {
          const { name, price, quantity, specification, categoryId } = res.data;
          setForm((prev) => ({
            ...prev,
            name,
            price,
            quantity,
            specification,
            categoryId,
          }));
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
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_item}>
          <strong>Name</strong>
          <br />
          <input
            name='name'
            type='text'
            value={name}
            required={true}
            onChange={handleForm}
          />
        </div>
        <div className={styles.form_item}>
          <strong>Specification</strong>
          <br />
          <input
            name='specification'
            type='text'
            value={specification}
            required={true}
            onChange={handleForm}
          />
        </div>
        <div className={styles.form_item}>
          <strong>Quantity</strong>
          <br />
          <input
            name='quantity'
            type='text'
            value={quantity}
            required={true}
            onChange={handleForm}
          />
        </div>
        <div className={styles.form_item}>
          <strong>Price</strong>
          <br />
          <input
            name='price'
            type='text'
            value={price}
            required={true}
            onChange={handleForm}
          />
        </div>
        <div className={styles.form_item}>
          <strong>Category</strong>
          <br />
          <select onChange={handleSelect}>
            <option defaultValue>Select Category</option>
            {categoryData?.map((e, i) => (
              <option value={e._id} key={i}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.form_item_btn}>
          <input type='submit' value={id ? 'Update Product' : 'Add Product'} />
        </div>
      </form>
    </div>
  );
};

export { AdminAddProduct };
