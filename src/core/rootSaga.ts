import { fork } from 'redux-saga/effects';
import invoicesSaga from '../dashboard/invoices.saga';
import invoicesModalSaga from '../dashboard/invoiceModal.saga';

export default function* rootSaga() {
  yield fork(invoicesSaga);
  yield fork(invoicesModalSaga);
}
