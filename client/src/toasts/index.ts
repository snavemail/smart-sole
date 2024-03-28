import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../css/toast.css';

export const successToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

export const authErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    className: 'error-toast'
  });
};
