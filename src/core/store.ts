/*import { MiddlewareArray, configureStore } from '@reduxjs/toolkit';
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

export default store;*/

import { MiddlewareArray, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { AnyAction, Store, combineReducers } from 'redux';
import rootSaga from './rootSaga';
import invoices from '../dashboard/invoices.reducer';
import invoiceModal from '../dashboard/invoiceModal.reducer';
import { Reducer } from 'react';

interface MyAppStore extends Store {
  asyncReducers?: {
    [key: string]: Reducer<any, AnyAction>;
  };
  injectReducer?: (key: string, asyncReducer: any) => void;
}

const sagaMiddleware = createSagaMiddleware();

const staticReducer = {
  dashboard: combineReducers({
    invoices,
    invoiceModal,
  }),
};

const store: MyAppStore = configureStore({
  reducer: createReducer(),
  middleware: new MiddlewareArray().concat(sagaMiddleware),
});

store.asyncReducers = {};
store.injectReducer = (key: string, asyncReducer: Reducer<any, AnyAction>) => {
  if (store.asyncReducers) store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

function createReducer(asyncReducers?: { [key: string]: Reducer<any, AnyAction> }) {
  return combineReducers({
    ...staticReducer,
    ...asyncReducers,
  });
}

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
