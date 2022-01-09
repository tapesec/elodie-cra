import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MonthSelector from './MonthSelector';

import HealingIcon from '@mui/icons-material/Healing';

import styles from './Dashboard.module.scss';

import ListInvoices from './ListInvoices';

const Dashboard = () => {
    return (
        <Container fixed maxWidth="xl">
            <h1 className={styles.hero}><HealingIcon/> ELODIE <span>Gestion des Paiements</span></h1>
            <Box sx={{ height: '100vh' }}>
                <MonthSelector />
                <ListInvoices/>
            </Box>
        </Container>
    )
}

export default Dashboard;