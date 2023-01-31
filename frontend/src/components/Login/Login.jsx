import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Login.module.css';
import { loginUser } from '../../utilities/networkRequests';
import { getItem, setItem } from '../../utilities/localStorage';
import { TOAST } from '../../utilities/toast';
import { useAtom } from 'jotai/react';
import { userAtom } from '../../store/userStore';

let initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [form, setForm] = useState(initialState);
  const history = useHistory();
  const [, setUserData] = useAtom(userAtom);

  useEffect(() => {
    let token = getItem('token');
    if (token !== null && token !== undefined) {
      history.push('/');
    }
  }, []);

  const handleForm = (e) => {
    let { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(form)
      .then((res) => {
        let { token, userDetails } = res.data;
        if (token) {
          setUserData((prev) => ({
            ...prev,
            name: userDetails.name,
            email: userDetails.email,
            isLoggedIn: true,
            isSeller: userDetails.role.includes('seller'),
          }));
          setItem('token', token);

          if (userDetails.role.includes('seller')) {
            history.push('/admin-dashboard');
          } else {
            history.push('/');
          }
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

  const handleNavigateToRegister = () => {
    history.push('/register');
  };

  const { email, password } = form;
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_item}>
          <strong>Email</strong>
          <br />
          <input
            name='email'
            type='email'
            // placeholder='Enter your email'
            value={email}
            required={true}
            onChange={handleForm}
          />
        </div>
        <div className={styles.form_item}>
          <strong>Password</strong>
          <br />
          <input
            name='password'
            type='password'
            // placeholder='Enter your password'
            value={password}
            required={true}
            onChange={handleForm}
          />
        </div>
        <div className={styles.form_item_btn}>
          <input type='submit' value='Login' />
        </div>
      </form>
      <div className={styles.options}>
        Not a user? | <span onClick={handleNavigateToRegister}>Register</span>
      </div>
    </div>
  );
};

export { Login };
