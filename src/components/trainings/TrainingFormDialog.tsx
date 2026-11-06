import { useMemo, useState, type SubmitEvent } from 'react';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useCustomers } from '../../hooks/useCustomers';
import { useAddTraining, useTrainings } from '../../hooks/useTrainings';
import type { Customer } from '../../types';
import { DATE_TIME_FORMAT, formatCustomerName } from '../../utils/format';
import { listActivities } from '../../utils/trainings';
import {
  hasErrors,
  validateTraining,
  type FormErrors,
  type TrainingFormValues,
} from '../../utils/validation';

type TrainingFormDialogProps = {
  /** Locks the form to this customer. Otherwise the user selects one from a list. */
  customer?: Customer;
  onClose: () => void;
};

const DEFAULT_DURATION_MINUTES = '60';

function getNextFullHour() {
  return dayjs().add(1, 'hour').startOf('hour');
}

export default function TrainingFormDialog({ customer, onClose }: TrainingFormDialogProps) {
  const [values, setValues] = useState<TrainingFormValues>(() => ({
    customer: customer ?? null,
    date: getNextFullHour(),
    activity: '',
    duration: DEFAULT_DURATION_MINUTES,
  }));
  const [errors, setErrors] = useState<FormErrors<keyof TrainingFormValues>>({});
  const { data: customers = [] } = useCustomers();
  const { data: trainings = [] } = useTrainings();
  const addTraining = useAddTraining();
  const activities = useMemo(() => listActivities(trainings), [trainings]);

  const updateValue = <TField extends keyof TrainingFormValues>(
    field: TField,
    value: TrainingFormValues[TField],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTraining(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors) || !values.customer || !values.date) {
      return;
    }

    addTraining.mutate(
      {
        date: values.date.toISOString(),
        duration: Number(values.duration),
        activity: values.activity.trim(),
        customer: values.customer.url,
      },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle>
          {customer ? `Add training for ${formatCustomerName(customer)}` : 'Add training'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {!customer && (
              <Autocomplete
                options={customers}
                value={values.customer}
                onChange={(_event, selected) => updateValue('customer', selected)}
                getOptionLabel={(option) => `${formatCustomerName(option)} (${option.email})`}
                getOptionKey={(option) => option.id}
                isOptionEqualToValue={(option, selected) => option.id === selected.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer"
                    required
                    autoFocus
                    error={Boolean(errors.customer)}
                    helperText={errors.customer}
                  />
                )}
              />
            )}
            <DateTimePicker
              label="Date and time"
              ampm={false}
              format={DATE_TIME_FORMAT}
              value={values.date}
              onChange={(date) => updateValue('date', date)}
              slotProps={{
                textField: {
                  required: true,
                  error: Boolean(errors.date),
                  helperText: errors.date,
                },
              }}
            />
            <Autocomplete
              freeSolo
              options={activities}
              inputValue={values.activity}
              onInputChange={(_event, activity) => updateValue('activity', activity)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Activity"
                  required
                  autoFocus={Boolean(customer)}
                  error={Boolean(errors.activity)}
                  helperText={errors.activity ?? 'Select an existing activity or type a new one'}
                />
              )}
            />
            <TextField
              label="Duration"
              type="number"
              required
              value={values.duration}
              onChange={(event) => updateValue('duration', event.target.value)}
              error={Boolean(errors.duration)}
              helperText={errors.duration}
              slotProps={{
                htmlInput: { min: 1, step: 5 },
                input: { endAdornment: <InputAdornment position="end">min</InputAdornment> },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" loading={addTraining.isPending}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
