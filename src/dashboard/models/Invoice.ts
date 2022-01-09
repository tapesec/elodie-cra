export interface Invoice {
    patient_share: PatientShare;
    SECU_share: SECUShare;
    removed: boolean;
    _id: string;
    date: string;
    patient_name: string;
    __v: number;
    total_line: number;
    total_line_paid: number;
    id: string;
}

export interface Invoices {
    [key: string]: Invoice;
}

export interface InvoicesTotals {
    total_SECU_share: string;
    total_patient_share: string;
    total_global_no_paid: string;
    total_global_paid: string;
}

export interface PatientShare {
    value: string;
    paid: boolean;
}
export interface SECUShare extends PatientShare {}

export interface InvoicesAPIResponse {
    invoices: Invoices;
    dateMonth: number;
    totals: InvoicesTotals;
}