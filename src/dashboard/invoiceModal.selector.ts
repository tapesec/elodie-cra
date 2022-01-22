import { RootState } from '../core/store';

export const getInvoiceModalStatus = (state: RootState) => {
  return state.dashboard.invoiceModal;
};
