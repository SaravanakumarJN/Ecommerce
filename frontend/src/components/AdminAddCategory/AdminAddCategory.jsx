import { useState } from 'react';
import styles from './AdminAddCategory.module.css';
import { addCategory } from '../../utilities/networkRequests';
import { TOAST } from '../../utilities/toast';

const AdminAddCategory = () => {
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    addCategory({ name: category })
      .then((res) => {
        if (!res.error) {
          setCategory('');
          TOAST('Category added successfully');
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

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_item}>
          <strong>Category Name</strong>
          <br />
          <input
            type='text'
            value={category}
            required={true}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className={styles.form_item_btn}>
          <input type='submit' value={'Add Category'} />
        </div>
      </form>
    </div>
  );
};

export { AdminAddCategory };
