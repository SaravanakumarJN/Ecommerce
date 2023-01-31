import { atom } from 'jotai/vanilla';
import { getAuthenticationDetails } from '../utilities/helper';

const { isLoggedIn, isSeller } = getAuthenticationDetails();

const userAtom = atom({
  name: '',
  email: '',
  isLoggedIn,
  isSeller,
});

const userCartAtom = atom([]);

export { userAtom, userCartAtom };
