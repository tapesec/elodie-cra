import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IchangeMonth,
  IchangeLoadStatus,
  IPatientPaid,
  TYPE_PAID,
  IInvoiceRemoved,
} from './invoices.actions';
import { InvoicesAPIResponse, Invoices, InvoicesTotals, Invoice } from './httpClient/invoices';

export interface InvoicesState {
  invoices: Invoices;
  dateMonth: number;
  totals: InvoicesTotals;
  isLoading: boolean;
}

const defaultTotals = {
  total_SECU_share: 0,
  total_global_no_paid: 0,
  total_global_paid: 0,
  total_patient_share: 0,
};

const initialState: InvoicesState = {
  dateMonth: new Date().getTime(),
  isLoading: true,
  invoices: {},
  totals: defaultTotals,
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    invoicesFetched: (state, action: PayloadAction<InvoicesAPIResponse>) => {
      state.invoices = action.payload.invoices;
      state.totals = action.payload.totals;
    },
    changeMonth: (state, action: PayloadAction<IchangeMonth>) => {
      state.dateMonth = action.payload.date;
      state.invoices = {};
      state.totals = defaultTotals;
    },
    loading: (state, action: PayloadAction<IchangeLoadStatus>) => {
      state.isLoading = action.payload.isLoading;
    },
    invoicePaid: (state, action: PayloadAction<IPatientPaid>) => {
      const payload = action.payload;
      const total = state.totals;
      const invoice = state.invoices[payload.invoiceId];
      updatePaymentsStatus(total, invoice, payload.target, payload.value);
    },
    invoiceRemoved: (state, action: PayloadAction<IInvoiceRemoved>) => {
      // const invoiceToDelete = state.invoices[action.payload.invoiceId];
      delete state.invoices[action.payload.invoiceId];
    },
  },
  extraReducers: {},
});

export const { invoicesFetched, invoiceRemoved, changeMonth, loading, invoicePaid } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;

const updatePaymentsStatus = (
  total: InvoicesTotals,
  invoice: Invoice,
  paymentType: TYPE_PAID,
  paymentStatus: boolean
): void => {
  let value;
  if (paymentType === TYPE_PAID.PATIENT_SHARE) {
    value = invoice.patient_share.value;
    invoice.patient_share.paid = paymentStatus;
  } else {
    // TYPE_PAID.SECU_SHARE
    value = invoice.SECU_share.value;
    invoice.SECU_share.paid = paymentStatus;
  }
  if (paymentStatus === false) {
    invoice.total_line_paid -= value;
    total.total_global_no_paid += value;
    total.total_global_paid -= value;
  } else {
    invoice.total_line_paid += value;
    total.total_global_no_paid -= value;
    total.total_global_paid += value;
  }
};
