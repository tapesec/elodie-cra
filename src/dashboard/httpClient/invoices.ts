//import request from 'superagent';
import { InvoicesAPIResponse } from '../models/Invoice';


const invoicesClient = {
	getAll(date: number): Promise<InvoicesAPIResponse> {
		return fetch(`/invoices?date=${date}`)
			.then(res => res.json())
			.then(json => {
				return json;
			});
	}
}

export default invoicesClient;

/*export default class InvoicesDao {

	static getAll(dateParams) {
		return new Promise((resolve, reject) => {
			request
			.get("/invoices")
			.query(dateParams)
			.end((err, res) => {
				console.log("invoices fetched !");
				if (err) return reject(err);
				resolve(res.body);
			});
			
		});
		
	}

	static persist(id, data) {
		return new Promise((resolve, reject) => {
			if (id) {

				let patch_describer = [
					{ op: 'replace', path: '/date', value: data.date },
					{ op: 'replace', path: '/patient_name', value: data.patient_name },
					{ op: 'replace', path: '/patient_share/value', value: data.patient_share_value },
					{ op: 'replace', path: '/SECU_share/value', value: data.SECU_share_value }
				];

				InvoicesDao.update({ id, patch_describer: patch_describer })
				.then((statusCode) => {
					return resolve();
				}, (err) => {
					// do something in case of error
				});

			} else {
				InvoicesDao.save({
					date: data.date,
					patient_name: data.patient_name,
					patient_share: {
						value: data.patient_share_value
					},
					SECU_share: {
						value: data.SECU_share_value
					}
				})
				.then((statusCode) => {
					return resolve();
				}, (err) => {
					// do something in case of error
				});
			}
		});
	}

	static save(data) {

		return new Promise((resolve, reject) => {
			
			request
			.post("/invoice")
			.send(data)
			.end((err, res) => {
				if (err) return reject(err);
				resolve(res.statusCode);
			});

		});
	}

	static update(data) {
		console.log(data, 'data');

		return new Promise((resolve, reject) => {
			request
			.patch("/invoice/"+data.id)
			.send(data.patch_describer)
			.end((err, res) => {
				if (err) return reject(err);
				resolve(res.statusCode);
			});
		});	
	}

	static remove(data) {

		return new Promise((resolve, reject) => {
			request
			.delete("/invoice/"+data.id)
			.end((err, res) => {
				if (err) return reject(err);
				resolve(res.statusCode);
			});
		});	
	}

	
};*/