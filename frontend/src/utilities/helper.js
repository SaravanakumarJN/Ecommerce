import jwt_decode from 'jwt-decode';
import { getItem } from './localStorage';

const getAuthenticationDetails = () => {
  const token = getItem('token');

  if (token === null || token === undefined) {
    return {
      isLoggedIn: false,
      isSeller: false,
    };
  }

  const tokenData = jwt_decode(token);
  return {
    isLoggedIn: true,
    isSeller: tokenData.role.includes('seller'),
  };
};

export { getAuthenticationDetails };
