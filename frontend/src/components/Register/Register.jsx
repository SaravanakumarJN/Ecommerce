import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Register.module.css';
import { registerUser } from '../../utilities/networkRequests';
import { TOAST } from '../../utilities/toast';

const initialState = {
  name: '',
  email: '',
  password: '',
};
const Register = () => {
  const [form, setForm] = useState(initialState);
  const history = useHistory();

  const handleForm = (e) => {
    let { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    registerUser(form)
      .then((res) => {
        TOAST(res.message + '. Please login');
        setForm(initialState);
        history.push('/login');
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

  const handleNavigateToLogin = () => {
    history.push('/login');
  };

  const { name, email, password } = form;
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_item}>
          <strong>Name</strong>
          <br />
          <input
            name='name'
            type='text'
            // placeholder='Enter the name'
            value={name}
            onChange={handleForm}
            required={true}
          />
        </div>
        <div className={styles.form_item}>
          <strong>Email</strong>
          <br />
          <input
            name='email'
            type='email'
            // placeholder='Enter the email'
            value={email}
            onChange={handleForm}
            required={true}
          />
        </div>
        <div className={styles.form_item}>
          <strong>Password</strong>
          <br />
          <input
            name='password'
            type='password'
            // placeholder='Enter the password'
            value={password}
            onChange={handleForm}
            required={true}
          />
        </div>
        <div className={styles.form_item_btn}>
          <input type='submit' value='Register' />
        </div>
      </form>
      <div className={styles.options}>
        Already a user? | <span onClick={handleNavigateToLogin}>Login</span>
      </div>
    </div>
  );
};

export { Register };
