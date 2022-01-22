import { RootState } from '../core/store';
import { Invoice, InvoicesTotals } from './httpClient/invoices';

export const getInvoices = (state: RootState): InvoicesGrid => {
  const arrInvoices = [];
  const list = state.dashboard.invoices;
  if (list.invoices) {
    for (const invoice in list.invoices) {
      arrInvoices.push(list.invoices[invoice]);
    }
  }
  return {
    ...state.dashboard.invoices,
    invoices: arrInvoices,
  };
};

export interface InvoicesGrid {
  invoices: Invoice[];
  dateMonth: number;
  totals?: InvoicesTotals;
  isLoading: boolean;
}

export const getCurrentMonth = (state: RootState): number => {
  return state.dashboard.invoices.dateMonth;
};

export const getRemainingToPaid = (state: RootState): CurrentMontToPaid => {
  const totals = state.dashboard.invoices.totals;
  if (!totals) return { toPaid: 0, paid: 0 };
  const noPaid = totals.total_global_no_paid;
  const paid = totals.total_global_paid;
  return {
    toPaid: noPaid,
    paid: noPaid + paid,
  };
};

export interface CurrentMontToPaid {
  toPaid: number;
  paid: number;
}
