import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    paddingTop: '10px',
  },
}));
