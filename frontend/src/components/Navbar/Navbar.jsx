import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';

import styles from './Navbar.module.css';
import { clearItem } from '../../utilities/localStorage';
import { useAtom } from 'jotai/react';
import { userAtom } from '../../store/userStore';
import { getProductBySearch } from '../../utilities/networkRequests';
import { TOAST } from '../../utilities/toast';
import { productsAtom } from '../../store/productStore';

const Navbar = () => {
  const [userData, setUserData] = useAtom(userAtom);
  const [, setProducts] = useAtom(productsAtom);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname.split('/');

  const handleLogout = () => {
    clearItem('token');
    setUserData({ name: '', email: '', isLoggedIn: false, isSeller: false });
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleCart = () => {
    history.push('/cart');
  };

  const handleNavigateHome = () => {
    if (pathname.includes('admin-dashboard')) {
      history.push('/admin-dashboard');
    } else {
      history.push('/');
    }
  };

  const handleSearch = () => {
    if (searchQuery !== '') {
      getProductBySearch(searchQuery)
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
    }
  };

  return (
    <div className={styles.nav}>
      <div
        className={styles.nav_clickables}
        style={{
          fontFamily: 'Comforter, cursive',
          lineHeight: '1',
          fontSize: '20px',
          color: '#ff0066',
        }}
        onClick={handleNavigateHome}
      >
        Polycommerce
      </div>
      <div className={styles.nav_space}></div>
      {!pathname.includes('login') &&
        !pathname.includes('register') &&
        !userData.isSeller && (
          <>
            {pathname[1] === '' && (
              <div className={styles.nav_searchbar}>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div onClick={handleSearch}>
                  <BiSearchAlt2 />
                </div>
              </div>
            )}

            <div className={styles.nav_clickables} onClick={handleCart}>
              Cart
            </div>
          </>
        )}
      <div
        className={styles.nav_clickables}
        onClick={userData.isLoggedIn ? handleLogout : handleLogin}
      >
        {userData.isLoggedIn ? 'Logout' : 'Login'}
      </div>
    </div>
  );
};

export { Navbar };
