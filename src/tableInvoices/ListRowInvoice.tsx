import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { initInvoiceEdition } from '../dashboard/invoiceModal.reducer';

import Checkbox from '@mui/material/Checkbox';
import { StyledTableCell, StyledTableRow } from '../dashboard/components/styled/Table';

import { TYPE_PAID } from '../dashboard/invoices.actions';

const ListRowInvoice = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const columnCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    dispatch({
      type: 'INVOICE_PAID',
      payload: {
        target: target.id,
        value: target.checked,
        invoiceId: props.invoice.id,
      },
    });
  };

  const { invoice } = props;
  const handleDoublEClickOnRow = () => {
    dispatch(initInvoiceEdition(invoice));
  };

  const handleDeleteAction = () => {
    dispatch({ type: 'REMOVE_INVOICE', payload: { invoiceId: props.invoice.id } });
  };

  const label = {
    inputProps: { 'aria-label': 'Part patient payé' },
  };
  return (
    <StyledTableRow onDoubleClick={handleDoublEClickOnRow}>
      <StyledTableCell>{dayjs(invoice.date).locale('fr').format('dddd DD MMMM')}</StyledTableCell>
      <StyledTableCell>{invoice.patient_name}</StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'left' }}>
        <Checkbox
          id={TYPE_PAID.PATIENT_SHARE}
          onChange={columnCheck}
          size="small"
          {...label}
          checked={invoice.patient_share.paid}
        />
        {invoice.patient_share?.value.toFixed(2) + ' €'}
      </StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'left' }}>
        <Checkbox
          id={TYPE_PAID.CPAM_SHARE}
          onChange={columnCheck}
          size="small"
          {...label}
          checked={invoice.SECU_share.paid}
        />
        {invoice.SECU_share?.value.toFixed(2) + ' €'}
      </StyledTableCell>
      <StyledTableCell>{invoice.total_line.toFixed(2) + ' €'}</StyledTableCell>
      <StyledTableCell>{invoice.total_line_paid.toFixed(2) + ' €'}</StyledTableCell>
      <StyledTableCell onClick={handleDeleteAction}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

interface Props {
  invoice: {
    date: string;
    patient_name: string;
    patient_share: {
      value: number;
      paid: boolean;
    };
    SECU_share: {
      value: number;
      paid: boolean;
    };
    total_line: number;
    total_line_paid: number;
    id: string;
  };
}

export default ListRowInvoice;
