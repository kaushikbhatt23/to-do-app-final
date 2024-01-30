// File: ToastUtils.tsx
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message: string): void => {
  toast.info(message, {
    position: 'top-center',
    autoClose: 2500, 
  });
};
