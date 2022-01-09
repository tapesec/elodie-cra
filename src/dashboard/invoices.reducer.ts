import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Invoices, InvoicesTotals } from './models/Invoice';

export interface InvoicesState {
    invoices?: Invoices
    dateMonth: number;
    total?: InvoicesTotals;
}

const initialState: InvoicesState = {
    dateMonth: new Date().getTime()
}

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    invoicesFetched: (state, action: PayloadAction<any>) => {
      state = action.payload;
      return state;
    },
    changeMonth: (state, action: PayloadAction<any>) => {
      state.dateMonth = action.payload.date;
      state.invoices = undefined;
      state.total = undefined;
      return state;
    }
  },
});

export const { invoicesFetched, changeMonth } = invoicesSlice.actions;

export default invoicesSlice.reducer