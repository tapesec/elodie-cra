import { RootState } from '../core/store';
import { getInvoices } from './invoices.selectors';
import { Invoices } from './models/Invoice';

it('Should transform an object into an array', () => {
    const fakeInvoice = {
        'fakeId1': {
            id: 'fakeId1',
            name: 'randomName'
        }
    };
    const fakeState: RootState = {
        dashboard: {
            invoices: {
                invoices: fakeInvoice as unknown as Invoices,
                dateMonth: 123456,
                isLoading: false
            }
        }
    };
    const res = getInvoices(fakeState);
    expect(res.invoices[0]).toEqual(fakeInvoice['fakeId1']);
});