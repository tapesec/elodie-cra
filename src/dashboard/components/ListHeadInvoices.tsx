import {StyledTableCell, StyledTableRow} from './styled/Table';

const ListHeadInvoices = () => {
    return (
        <StyledTableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Nom</StyledTableCell>
            <StyledTableCell>Part patient</StyledTableCell>
            <StyledTableCell>Part CPAM</StyledTableCell>
            <StyledTableCell>A payer</StyledTableCell>
            <StyledTableCell>Payé</StyledTableCell>
        </StyledTableRow>
    )
}

export default ListHeadInvoices;