import React, { useEffect } from 'react';
import { useSelector } from '@redux/useSelector';
import { useToasts } from 'react-toast-notifications';
import { dispatch } from '@redux/store';
import { clearErrors } from '@redux/config';

const ToastHandler = () => {
  const errorMessages = useSelector(state => state.config.errorMessages);
  const { addToast } = useToasts();

  useEffect(() => {
    if (errorMessages.length) {
      errorMessages.map(m => {
        addToast(m, { appearance: 'error' });
      });
      setTimeout(() => dispatch(clearErrors()), 500);
    }
  }, [errorMessages]);

  return null;
};

export default ToastHandler;
