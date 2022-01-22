import { RootState } from '../core/store';
import { getInvoices } from './invoices.selectors';
import { dummyInvoiceModalState, fakeInvoicesState } from './mocks/mocks';

test('Should transform an object into an array', () => {
  const fakeState: RootState = {
    dashboard: {
      invoices: fakeInvoicesState,
      invoiceModal: dummyInvoiceModalState,
    },
  };
  const res = getInvoices(fakeState);
  expect(res.invoices[0]).toEqual(fakeInvoicesState.invoices['1111']);
});
