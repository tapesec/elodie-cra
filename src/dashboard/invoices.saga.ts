import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import httpClient, { InvoicesAPIResponse, PATCH_BODY } from '../dashboard/httpClient/invoices';
import {
  IchangeMonth,
  IInvoiceRemoved,
  IPatientPay,
  TYPE_PAID,
} from '../dashboard/invoices.actions';
import {
  invoicesFetched,
  invoiceRemoved,
  changeMonth,
  loading,
  invoicePaid,
} from '../dashboard/invoices.reducer';
import { getCurrentMonth } from '../dashboard/invoices.selectors';

export function* fetchInvoicesSaga(): Generator<any, any, any> {
  const currentMonth = yield select(getCurrentMonth);
  yield put(loading({ isLoading: true }));
  const invoices: InvoicesAPIResponse = yield call(httpClient.getAll, currentMonth);
  yield put(invoicesFetched(invoices));
  yield put(loading({ isLoading: false }));
}

function* patchInvoiceSaga(action: PayloadAction<IPatientPay>): Generator<any, any, any> {
  const payload = action.payload;
  const patchBody: PATCH_BODY[] = [
    {
      op: 'replace',
      value: payload.value,
    },
  ];
  if (payload.target === TYPE_PAID.PATIENT_SHARE) {
    patchBody[0].path = '/patient_share/paid';
  }
  if (payload.target === TYPE_PAID.CPAM_SHARE) {
    patchBody[0].path = '/SECU_share/paid';
  }
  yield call(httpClient.update, payload.invoiceId, patchBody);
  yield put(invoicePaid(payload));
}

function* changeMonthSaga(action: PayloadAction<IchangeMonth>): Generator<any, any> {
  yield put(changeMonth(action.payload));
  yield call(fetchInvoicesSaga);
}

function* removeInvoiceSaga(action: PayloadAction<IInvoiceRemoved>): Generator<any, any> {
  yield call(httpClient.remove, action.payload.invoiceId);
  yield put(invoiceRemoved(action.payload));
}

export default function* invoicesSaga() {
  yield all([
    takeLatest('FETCH_INVOICES', fetchInvoicesSaga),
    takeLatest('CHANGE_MONTH', changeMonthSaga),
    takeLatest('INVOICE_PAID', patchInvoiceSaga),
    takeLatest('REMOVE_INVOICE', removeInvoiceSaga),
  ]);
}
