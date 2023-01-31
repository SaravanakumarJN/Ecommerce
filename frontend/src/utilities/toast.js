import { toast } from 'react-toastify';

export const TOAST = (component) => {
  const options = {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  return toast(component, options);
};
