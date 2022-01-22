import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { toggleModal } from '../invoiceModal.reducer';
import { useDispatch } from 'react-redux';
import React from 'react';

const AddInvoiceButton = () => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(toggleModal({ open: true }));
  };
  return (
    <Fab
      sx={{
        position: 'absolute',
        right: '30px',
        top: '10px',
      }}
      onClick={onClickHandler}
      size="small"
      color="primary"
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
};

export default AddInvoiceButton;
