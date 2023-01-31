import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TOAST } from '../../utilities/toast';
import { getAllAdminProducts } from '../../utilities/networkRequests';
import { useAtom } from 'jotai/react';
import { adminProductsAtom } from '../../store/productStore';
import styles from './AdminDashboard.module.css';

const heeaderConfig = [
  'Name',
  'Specification',
  'Price',
  'Quantity',
  'Category',
  '',
];

const AdminDashboard = () => {
  const [adminProducts, setAdminProducts] = useAtom(adminProductsAtom);
  const history = useHistory();

  useEffect(() => {
    getAllAdminProducts()
      .then((res) => {
        setAdminProducts(res.data);
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

  const handleEdit = (id) => {
    if (id) {
      history.push(`admin-dashboard/edit/${id}`);
    } else {
      history.push('admin-dashboard/add-product');
    }
  };

  const handleAddCategory = () => {
    history.push('admin-dashboard/add-category');
  };

  return (
    <div className={styles.container}>
      <div className={styles.cta_container}>
        <button className={styles.button} onClick={() => handleEdit()}>
          Add Product
        </button>
        <button className={styles.button} onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
      <div className={styles.table_container}>
        <div className={styles.header}>
          {heeaderConfig?.map((ele, i) => {
            const width = 100 / heeaderConfig.length;
            return (
              <div style={{ width: `${width}%` }} key={i}>
                {ele}
              </div>
            );
          })}
        </div>
        <div className={styles.content}>
          {adminProducts?.length &&
            adminProducts.map((ele, i) => {
              const width = 100 / heeaderConfig.length;
              return (
                <div key={i} className={styles.content_row}>
                  <div
                    style={{ width: `${width}%` }}
                    className={styles.content_row_item}
                  >
                    {ele.name}
                  </div>
                  <div
                    style={{ width: `${width}%` }}
                    className={styles.content_row_item}
                  >
                    {ele.specification}
                  </div>
                  <div
                    style={{ width: `${width}%` }}
                    className={styles.content_row_item}
                  >
                    {ele.price}
                  </div>
                  <div
                    style={{ width: `${width}%` }}
                    className={styles.content_row_item}
                  >
                    {ele.quantity}
                  </div>
                  <div
                    style={{ width: `${width}%` }}
                    className={styles.content_row_item}
                  >
                    {ele.categoryId.name}
                  </div>
                  <div
                    style={{ width: `${width}%` }}
                    className={styles.content_row_item}
                  >
                    <button onClick={() => handleEdit(ele._id)}>Edit</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export { AdminDashboard };
