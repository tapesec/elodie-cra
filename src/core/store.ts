import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import invoices from '../dashboard/invoices.reducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
        invoices
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>

export default store;

