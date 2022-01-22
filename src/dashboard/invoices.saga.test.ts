import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { select } from 'redux-saga/effects';
import httpClient, { InvoicesAPIResponse } from '../dashboard/httpClient/invoices';

import { fetchInvoicesSaga } from './invoices.saga';
import { getCurrentMonth } from '../dashboard/invoices.selectors';
import { invoicesFetched, loading } from '../dashboard/invoices.reducer';

it('puts an ADD action', () => {
  return expectSaga(fetchInvoicesSaga)
    .provide([
      [select(getCurrentMonth), 1234567890],
      [call.fn(httpClient.getAll), { id: 42, name: 'John Doe' }],
    ])
    .put(invoicesFetched({ id: 42, name: 'John Doe' } as unknown as InvoicesAPIResponse))
    .put(loading({ isLoading: true }))
    .put(loading({ isLoading: false }))
    .run();
});
