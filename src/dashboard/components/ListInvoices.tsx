import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import ListHeadInvoices from './ListHeadInvoices';

import { getInvoices } from '../invoices.selectors';
import { LoadedTableCell, LoadedTableRow } from './styled/Table';

import ListRowInvoice from 'tableRow/TableRow';

const ListInvoices = () => {
  const dispatch = useDispatch();
  const list = useSelector(getInvoices);

  useEffect(() => {
    dispatch({ type: 'FETCH_INVOICES' });
  }, [dispatch]);

  return (
    <TableContainer sx={{ height: 'calc(100vh - 200px)' }} component={Paper}>
      <Table sx={{ height: '100%' }} size="small" aria-label="sticky table" stickyHeader>
        <TableHead>
          <ListHeadInvoices />
        </TableHead>
        <TableBody>
          {list.isLoading && (
            <LoadedTableRow>
              <LoadedTableCell colSpan={6}>Loading</LoadedTableCell>
            </LoadedTableRow>
          )}
          {list.isLoading === false && list.invoices.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>Aucune facture pour le moment ...</TableCell>
            </TableRow>
          )}
          {list.isLoading === false &&
            list.invoices.map((invoice: any) => (
              <ListRowInvoice key={invoice.id} invoice={invoice} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListInvoices;
