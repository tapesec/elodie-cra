import { TYPE_PAID } from './invoices.actions';
import reducer, { changeMonth, invoicePaid } from './invoices.reducer';
import { fakeInvoicesState } from './mocks/mocks';

test('Should change the month when action is triggered', () => {
  const state = fakeInvoicesState;
  const action = changeMonth({
    date: 1234,
  });
  const newState = reducer(state, action);
  expect(newState.dateMonth).toEqual(1234);
});

test('Should update payment status when an invoice payment checkbox is checked', () => {
  const state = fakeInvoicesState;
  const invoiceId = '1111';
  const action = invoicePaid({
    invoiceId,
    target: TYPE_PAID.CPAM_SHARE,
    value: true,
  });
  const newState = reducer(state, action);
  const newInvoice = newState.invoices[invoiceId];
  const newTotal = newState.totals;
  expect(newInvoice.SECU_share.paid).toEqual(true);
  expect(newInvoice.total_line_paid.toFixed(2)).toEqual('18.35');
  expect(newInvoice.total_line.toFixed(2)).toEqual('18.35');
  expect(newTotal.total_global_no_paid.toFixed(2)).toEqual(
    (state.totals.total_global_no_paid - newInvoice.SECU_share.value).toFixed(2)
  );
  expect(newTotal.total_global_paid.toFixed(2)).toEqual(
    (state.totals.total_global_paid + newInvoice.SECU_share.value).toFixed(2)
  );
});
