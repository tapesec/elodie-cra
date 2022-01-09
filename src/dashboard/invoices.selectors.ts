import {RootState} from '../core/store';
import { Invoice, InvoicesTotals } from './models/Invoice';

export const getInvoices = (state: RootState): InvoicesGrid => {
    const arrInvoices = [];
    const list = state.dashboard.invoices;
    if (list.invoices) {
        for (const invoice in list.invoices) {
            arrInvoices.push(list.invoices[invoice]);
        }
    }
    return {
        ...state.dashboard.invoices,
        invoices: arrInvoices,
    }
}

export interface InvoicesGrid {
    invoices: Invoice[];
    dateMonth: number;
    totals?: InvoicesTotals;
    isLoading: boolean;
}


export const getCurrentMonth = (state: RootState): number => {
    return state.dashboard.invoices.dateMonth;
}