import Container from '@mui/material/Container';
import HealingIcon from '@mui/icons-material/Healing';

import AddInvoiceButton from './AddInvoiceButton';
import DialogContainer from './DialogContainer';
import ListInvoices from './ListInvoices';
import MonthSelector from './MonthSelector';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <Container sx={{ position: 'relative' }} fixed maxWidth="xl">
      <h1 className={styles.hero}>
        <HealingIcon /> ELODIE <span>Gestion des Paiements</span>
        <div className={styles.disclaimer}>Garde courage Danse avec les sparadras 👩‍⚕️</div>
      </h1>
      <MonthSelector />
      <ListInvoices />
      <AddInvoiceButton />
      <DialogContainer />
    </Container>
  );
};

export default Dashboard;
