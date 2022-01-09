import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import httpClient from '../dashboard/httpClient/invoices';
import { invoicesFetched, changeMonth, loading } from '../dashboard/invoices.reducer';
import { getCurrentMonth } from '../dashboard/invoices.selectors';

function* fetchInvoicesSaga(): Generator<any, any, any> {
    const currentMonth = yield select(getCurrentMonth);
    yield put(loading({isLoading: true}));
    const invoices = yield call([httpClient, 'getAll'], currentMonth);
    yield put(invoicesFetched(invoices));
    yield put(loading({isLoading: false}));

}

function* changeMonthSaga(action: any): Generator<any, any> {
    yield put(changeMonth(action.payload));
    yield call(fetchInvoicesSaga);
}


export default function* rootSaga() {
    yield all([
        takeLatest('FETCH_INVOICES', fetchInvoicesSaga),
        takeLatest('CHANGE_MONTH', changeMonthSaga)
    ]);
}