export interface IchangeMonth {
  date: number;
}

export interface IchangeLoadStatus {
  isLoading: boolean;
}

export interface IPatientPay {
  invoiceId: string;
  target: TYPE_PAID;
  value: boolean;
}

export interface IPatientPaid {
  invoiceId: string;
  target: TYPE_PAID;
  value: boolean;
}

export interface IInvoiceRemoved {
  invoiceId: string;
}

export enum TYPE_PAID {
  PATIENT_SHARE = 'patient_paid',
  CPAM_SHARE = 'SECU_paid',
}
