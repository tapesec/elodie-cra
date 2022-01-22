import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { toggleModal } from '../invoiceModal.reducer';
import { useDispatch } from 'react-redux';

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
