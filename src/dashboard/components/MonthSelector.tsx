import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


import styles from './Dashboard.module.scss';
import { getCurrentMonth } from '../invoices.selectors';


const MonthSelector = () => {
    const currentMonth = useSelector(getCurrentMonth);
    const dispatch = useDispatch();

    const browseMonth = (direction: string) => {
        let date = dayjs(currentMonth);
        if (direction === 'prev') date = date.subtract(1, 'months');
        else date = date.add(1, 'months')
        dispatch({ type: 'CHANGE_MONTH', payload: {
            date: date.unix() * 1000
        }});
    }

    return(
        <Stack 
            direction="row" 
            alignItems={"center"}
            justifyContent={"space-evenly"}
            margin={'20px 0'}
            spacing={2}>
                <Button onClick={() => {browseMonth('prev')}}>
                    <ChevronLeftIcon/>
                    Précédent
                </Button>
                <div className={styles.currentMonth}>
                    { dayjs(currentMonth).locale('fr').format('MMMM')}
                </div>
                <Button onClick={() => {browseMonth('next')}}>
                    Suivant
                    <ChevronRightIcon/>
                </Button>
        </Stack>
    );
}

export default MonthSelector;
