import dayjs from 'dayjs';
import 'dayjs/locale/fr';

import Checkbox from '@mui/material/Checkbox';
import {StyledTableCell, StyledTableRow} from './styled/Table';


const ListRowInvoice = (props: Props): JSX.Element => {
    const { invoice } = props;
    const label = { 
        inputProps: { 'aria-label': 'Part patient payé' } 
    };
    return (
        <StyledTableRow>
            <StyledTableCell>{dayjs(invoice.date).locale('fr').format('dddd DD MMMM')}</StyledTableCell>
            <StyledTableCell>{invoice.patient_name}</StyledTableCell>
            <StyledTableCell sx={{textAlign: 'left' }}>
                <Checkbox size="small" {...label} checked={invoice.patient_share.paid} />
                {invoice.patient_share?.value + ' €'}
            </StyledTableCell>
            <StyledTableCell sx={{textAlign: 'left' }}>
                <Checkbox size="small" {...label} checked={invoice.patient_share.paid} />
                {invoice.SECU_share?.value + ' €'}
            </StyledTableCell>
            <StyledTableCell>{invoice.total_line + ' €'}</StyledTableCell>
            <StyledTableCell>{invoice.total_line_paid + ' €'}</StyledTableCell>
        </StyledTableRow>
    )
};

interface Props {
    invoice: {
        date: string;
        patient_name: string;
        patient_share: {
            value: string;
            paid: boolean;
        },
        SECU_share:{
            value: string;
            paid: boolean;
        } 
        total_line: string;
        total_line_paid: string;
    }
}

export default ListRowInvoice;