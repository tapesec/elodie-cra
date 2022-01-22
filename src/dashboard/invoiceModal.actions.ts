export interface IModalStatus {
  open: boolean;
}

export interface ISubmitInvoice {
  invoiceId?: string;
  dateInvoice: string;
  patient_name: string;
  patient_share: number;
  patient_paid: boolean;
  SECU_share: number;
  SECU_paid: boolean;
  mode: 'EDIT' | 'CREATE';
}
