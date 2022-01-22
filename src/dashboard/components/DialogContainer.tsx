import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getInvoiceModalStatus } from '../invoiceModal.selector';

const Component = React.lazy(() => import('./InvoiceModal'));

const DialogContainer = () => {
  const modalStatus = useSelector(getInvoiceModalStatus);

  return modalStatus.open ? (
    <Suspense fallback={() => <></>}>
      <Component />
    </Suspense>
  ) : null;
};

export default DialogContainer;
