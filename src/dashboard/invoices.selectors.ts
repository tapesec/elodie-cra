import {RootState} from '../core/store';
import { Invoice, InvoicesTotals } from './models/Invoice';

export const getInvoices = (state: RootState): InvoicesGrid => {
    const arrInvoices = [];
    const list = state.invoices;
    if (list.invoices) {
        for (const invoice in list.invoices) {
            arrInvoices.push(list.invoices[invoice]);
        }
    }
    return {
        ...state.invoices,
        invoices: arrInvoices,
    }
}

export interface InvoicesGrid {
    invoices: Invoice[];
    dateMonth: number;
    totals?: InvoicesTotals;
}


export const getCurrentMonth = (state: RootState): number => {
    return state.invoices.dateMonth;
}