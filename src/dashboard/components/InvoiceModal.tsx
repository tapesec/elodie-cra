import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceModalStatus } from '../invoiceModal.selector';
import { toggleModal } from '../invoiceModal.reducer';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

enum FIELD_TYPE {
  PATIENT_NAME = 'patient_name',
  PATIENT_SHARE = 'patient_share',
  PATIENT_PAID = 'patient_paid',
  SECU_SHARE = 'SECU_share',
  SECU_PAID = 'SECU_paid',
}

export default function FormDialog() {
  const [state, setState] = useState<InvoiceModalInternalState>({
    invoiceId: undefined,
    dateInvoice: new Date().toString(),
    patient_name: '',
    patient_share: 0,
    patient_paid: false,
    SECU_share: 0,
    SECU_paid: false,
    mode: 'CREATE',
    dateError: false,
  });
  const dispatch = useDispatch();
  const modalStatus = useSelector(getInvoiceModalStatus);
  const invoiceToUpdate = modalStatus.invoiceToUpdate;
  useEffect(() => {
    setState({
      invoiceId: invoiceToUpdate?.id,
      dateInvoice: invoiceToUpdate?.date || new Date().toString(),
      patient_name: invoiceToUpdate?.patient_name || '',
      patient_share: invoiceToUpdate?.patient_share.value || 0,
      patient_paid: invoiceToUpdate?.patient_share.paid || false,
      SECU_share: invoiceToUpdate?.SECU_share.value || 0,
      SECU_paid: invoiceToUpdate?.SECU_share.paid || false,
      mode: 'EDIT',
      dateError: false,
    });
  }, [invoiceToUpdate]);

  let modalTitle;
  if (!modalStatus.invoiceToUpdate) {
    modalTitle = 'Ajoute une facturation';
  } else modalTitle = 'Modifie une facturation';

  const handleClose = () => {
    dispatch(toggleModal({ open: false }));
  };

  const submit = () => {
    dispatch({
      type: 'SAVE_INVOICE',
      payload: {
        invoiceId: state.invoiceId,
        dateInvoice: state.dateInvoice,
        patient_name: state.patient_name,
        patient_share: state.patient_share || 0,
        patient_paid: state.patient_paid,
        SECU_share: state.SECU_share || 0,
        SECU_paid: state.SECU_paid,
        mode: state.mode,
      },
    });
  };

  const submitDisabled =
    state.patient_name === '' || state.dateError === true || state.dateInvoice === null;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const handleValueByTarget = (target: EventTarget & HTMLInputElement) => {
      if (target.id === FIELD_TYPE.PATIENT_PAID || target.id === FIELD_TYPE.SECU_PAID)
        return target.checked;
      if (target.id === FIELD_TYPE.PATIENT_SHARE || target.id === FIELD_TYPE.SECU_SHARE) {
        if (target.value === '') return 0;
        return parseFloat(target.value.replace(',', '.'));
      }
      return target.value;
    };
    setState((prevState) => ({
      ...prevState,
      [target.id]: handleValueByTarget(target),
    }));
  };

  const dateOnChange = (newValue: Date | null) => {
    setState((prevState) => ({
      ...prevState,
      dateInvoice: newValue?.toString() || new Date().toString(),
    }));
  };

  const dateOnError = (error: string | null) => {
    setState((prevState) => ({
      ...prevState,
      dateError: error !== null,
    }));
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={modalStatus.open} onClose={handleClose}>
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent style={{ paddingTop: '10px' }}>
        <LocalizationProvider locale="fr" dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date du soin"
            mask="__/__/__"
            value={state.dateInvoice}
            inputFormat="DD/MM/YY"
            onError={dateOnError}
            onChange={dateOnChange}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
        <TextField
          autoFocus
          margin="dense"
          id={FIELD_TYPE.PATIENT_NAME}
          label="Nom du patient"
          type="text"
          placeholder="Danse avec les sparadrap"
          required={true}
          fullWidth
          value={state.patient_name}
          variant="standard"
          onChange={onInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id={FIELD_TYPE.PATIENT_SHARE}
          label="Part patient"
          type="number"
          placeholder="499.99"
          helperText=""
          fullWidth
          value={state.patient_share || ''}
          onChange={onInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          variant="standard"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                id={FIELD_TYPE.PATIENT_PAID}
                onChange={onInputChange}
                checked={state.patient_paid}
              />
            }
            label="Payé ?"
          />
        </FormGroup>
        <TextField
          autoFocus
          margin="dense"
          id={FIELD_TYPE.SECU_SHARE}
          label="Part CPAM"
          type="number"
          placeholder="499.99"
          fullWidth
          value={state.SECU_share || ''}
          onChange={onInputChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          variant="standard"
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                id={FIELD_TYPE.SECU_PAID}
                onChange={onInputChange}
                checked={state.SECU_paid}
              />
            }
            label="Payé ?"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button disabled={submitDisabled} onClick={submit}>
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface InvoiceModalInternalState {
  invoiceId: string | undefined;
  dateInvoice: string;
  patient_name: string;
  patient_share: number;
  patient_paid: boolean;
  SECU_share: number;
  SECU_paid: boolean;
  dateError: boolean;
  mode: 'EDIT' | 'CREATE';
}
