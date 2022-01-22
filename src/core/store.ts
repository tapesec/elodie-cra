import { MiddlewareArray, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import rootSaga from './rootSaga';
import invoices from '../dashboard/invoices.reducer';
import invoiceModal from '../dashboard/invoiceModal.reducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    dashboard: combineReducers({
      invoices,
      invoiceModal,
    }),
  },
  middleware: new MiddlewareArray().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
