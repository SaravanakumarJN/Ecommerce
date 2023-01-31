import { useEffect, useState } from 'react';
import { useAtom } from 'jotai/react';

import { Routes } from './routes/Routes';
import { Navbar } from './components/Navbar/Navbar';
import styles from './App.module.css';
import { userAtom, userCartAtom } from './store/userStore';
import {
  getUserCartDetails,
  getUserDetails,
} from './utilities/networkRequests';
import { TOAST } from './utilities/toast';

function App() {
  const [userData, setUserData] = useAtom(userAtom);
  const [, setUserCartData] = useAtom(userCartAtom);

  useEffect(() => {
    if (userData.isLoggedIn) {
      getUserDetails()
        .then(({ data }) => {
          let { userDetails } = data;

          if (data) {
            setUserData((prev) => ({ ...prev, ...userDetails }));
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
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <Routes />
      </div>
    </div>
  );
}

export default App;
