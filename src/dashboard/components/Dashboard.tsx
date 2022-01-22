import Container from '@mui/material/Container';
import HealingIcon from '@mui/icons-material/Healing';
import DialogContainer from './DialogContainer';
import MonthSelector from './MonthSelector';
import styles from './Dashboard.module.scss';
import ListInvoices from './ListInvoices';
import AddInvoiceButton from './AddInvoiceButton';

const Dashboard = () => {
  return (
    <Container sx={{ position: 'relative' }} fixed maxWidth="xl">
      <h1 className={styles.hero}>
        <HealingIcon /> ELODIE <span>Gestion des Paiements</span>
      </h1>
      <MonthSelector />
      <ListInvoices />
      <AddInvoiceButton />
      <DialogContainer />
    </Container>
  );
};

export default Dashboard;
