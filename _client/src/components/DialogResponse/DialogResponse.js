import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearResponse } from '../../reducers/UserReducer';

const DialogError = ({ open, setOpen, authMessage }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(clearResponse());
    }, 300);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{authMessage}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogError;
