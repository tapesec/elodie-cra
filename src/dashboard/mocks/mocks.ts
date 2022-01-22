import { Invoice } from '../httpClient/invoices';
import { InvoiceModalState } from '../invoiceModal.reducer';
import { InvoicesState } from '../invoices.reducer';

export const createInvoiceMock = (id: string): Invoice => ({
  id,
  date: '2021/01/21',
  patient_share: {
    paid: true,
    value: 12.34,
  },
  SECU_share: {
    paid: false,
    value: 6.01,
  },
  patient_name: 'John DOE',
  total_line_paid: 12.34,
  total_line: 18.35,
});

export const fakeInvoicesState: InvoicesState = {
  dateMonth: new Date().getTime(),
  invoices: {
    '1111': createInvoiceMock('1111'),
    '1112': createInvoiceMock('1112'),
  },
  totals: {
    total_SECU_share: 10.2,
    total_patient_share: 10.3,
    total_global_paid: 24.68,
    total_global_no_paid: 12.02,
  },
  isLoading: false,
};

export const dummyInvoiceModalState: InvoiceModalState = {
  open: false,
};
