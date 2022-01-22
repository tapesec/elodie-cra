import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IModalStatus } from './invoiceModal.actions';
import { Invoice } from './httpClient/invoices';

export interface InvoiceModalState {
  open: boolean;
  invoiceToUpdate?: Invoice;
}

const initialState: InvoiceModalState = {
  open: false,
};

export const invoiceModalSlice = createSlice({
  name: 'invoiceModal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<IModalStatus>) => {
      state.invoiceToUpdate = undefined;
      state.open = action.payload.open;
    },
    initInvoiceEdition: (state, action: PayloadAction<Invoice>) => {
      state.invoiceToUpdate = action.payload;
      state.open = true;
    },
  },
  extraReducers: {},
});

export const { toggleModal, initInvoiceEdition } = invoiceModalSlice.actions;

export default invoiceModalSlice.reducer;
