import { Snackbar } from '@mui/material';
import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenSelector, messageSelector, typeSelector } from '../../../store/selectors';
import { toastAction } from '../../../store/actions';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} variant="filled" {...props} />;
});

const SnackBarUI = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(isOpenSelector);
  const message = useSelector(messageSelector);
  const type = useSelector(typeSelector);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toastAction.closeToast());
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarUI;
