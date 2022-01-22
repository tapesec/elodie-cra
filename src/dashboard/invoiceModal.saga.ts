import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ISubmitInvoice } from './invoiceModal.actions';

import httpClient from '../dashboard/httpClient/invoices';
import { fetchInvoicesSaga } from './invoices.saga';
import { toggleModal } from './invoiceModal.reducer';

function* initInvoiceCreation(action: PayloadAction<ISubmitInvoice>) {
  console.log(action, 'action');

  yield call([httpClient, 'persist'], action.payload, action.payload.invoiceId);
  yield call(fetchInvoicesSaga);
  yield put(toggleModal({ open: false }));
}

export default function* invoicesSaga() {
  yield all([takeLatest('SAVE_INVOICE', initInvoiceCreation)]);
}
