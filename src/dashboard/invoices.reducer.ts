import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Invoices, InvoicesTotals } from './models/Invoice';

export interface InvoicesState {
    invoices?: Invoices
    dateMonth: number;
    totals?: InvoicesTotals;
    isLoading: boolean;
}

const initialState: InvoicesState = {
    dateMonth: new Date().getTime(),
    isLoading: true
}

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    invoicesFetched: (state, action: PayloadAction<any>) => {
      state.invoices = action.payload.invoices;
      state.totals = action.payload.totals;
    },
    changeMonth: (state, action: PayloadAction<any>) => {
      state.dateMonth = action.payload.date;
      state.invoices = undefined;
      state.totals = undefined;
    },
    loading: (state, action: PayloadAction<any>) => {
      state.isLoading = action.payload.isLoading;
    }
  },
});

export const { invoicesFetched, changeMonth, loading } = invoicesSlice.actions;

export default invoicesSlice.reducer