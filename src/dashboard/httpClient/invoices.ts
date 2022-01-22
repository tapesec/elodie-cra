import { ISubmitInvoice } from '../invoiceModal.actions';

//import request from 'superagent';
const invoicesClient = {
  getAll(date: number): Promise<InvoicesAPIResponse> {
    return fetch(`/invoices?date=${date}`)
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  },
  update(id: string, patchBody: PATCH_BODY[]): Promise<any> {
    return fetch(`/invoice/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchBody),
    });
  },
  persist(data: ISubmitInvoice, id?: string): Promise<any> {
    if (id) {
      const patch_describer = [
        { op: 'replace', path: '/date', value: data.dateInvoice },
        { op: 'replace', path: '/patient_name', value: data.patient_name },
        { op: 'replace', path: '/patient_share/value', value: data.patient_share },
        { op: 'replace', path: '/patient_share/paid', value: data.patient_paid },
        { op: 'replace', path: '/SECU_share/value', value: data.SECU_share },
        { op: 'replace', path: '/SECU_share/paid', value: data.SECU_paid },
      ];
      console.log(patch_describer, 'patch_describer');
      return invoicesClient.update(id, patch_describer);
    }
    const body = {
      date: data.dateInvoice,
      patient_name: data.patient_name,
      patient_share: {
        value: data.patient_share,
        paid: data.patient_paid,
      },
      SECU_share: {
        value: data.SECU_share,
        paid: data.SECU_paid,
      },
    };
    console.log(body, 'body');
    return invoicesClient.save(body);
  },
  save(data: any) {
    return fetch('/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  remove(invoiceId: string) {
    return fetch(`/invoice/${invoiceId}`, {
      method: 'DELETE',
    });
  },
};

export interface PATCH_BODY {
  op?: string;
  path?: string;
  value?: any;
}

export interface Invoice {
  patient_share: PatientShare;
  SECU_share: SECUShare;
  date: string;
  patient_name: string;
  total_line: number;
  total_line_paid: number;
  id: string;
}

export interface Invoices {
  [key: string]: Invoice;
}

export interface InvoicesTotals {
  total_SECU_share: number;
  total_patient_share: number;
  total_global_no_paid: number;
  total_global_paid: number;
}

export interface PatientShare {
  value: number;
  paid: boolean;
}
export type SECUShare = PatientShare;

export interface InvoicesAPIResponse {
  invoices: Invoices;
  dateMonth: number;
  totals: InvoicesTotals;
}

export default invoicesClient;

/*export default class InvoicesDao {


	static remove(data) {

		
	}

	
};*/
