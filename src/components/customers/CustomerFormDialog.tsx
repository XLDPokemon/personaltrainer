import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useAddCustomer, useUpdateCustomer } from '../../hooks/useCustomers';
import type { Customer, CustomerFields } from '../../types';
import { hasErrors, validateCustomer, type FormErrors } from '../../utils/validation';

type CustomerFormDialogProps = {
  /** The customer to edit. A new customer is created when omitted. */
  customer?: Customer;
  onClose: () => void;
};

type FieldConfig = {
  name: keyof CustomerFields;
  label: string;
  type?: string;
  fullRow?: boolean;
};

const FIELDS: FieldConfig[] = [
  { name: 'firstname', label: 'First name' },
  { name: 'lastname', label: 'Last name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'streetaddress', label: 'Street address', fullRow: true },
  { name: 'postcode', label: 'Postcode' },
  { name: 'city', label: 'City' },
];

const EMPTY_VALUES: CustomerFields = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  streetaddress: '',
  postcode: '',
  city: '',
};

function pickFormValues(customer?: Customer): CustomerFields {
  if (!customer) {
    return EMPTY_VALUES;
  }
  const { firstname, lastname, email, phone, streetaddress, postcode, city } = customer;
  return { firstname, lastname, email, phone, streetaddress, postcode, city };
}

function trimValues(values: CustomerFields): CustomerFields {
  const entries = Object.entries(values).map(([name, value]) => [name, value.trim()]);
  return Object.fromEntries(entries) as CustomerFields;
}

export default function CustomerFormDialog({ customer, onClose }: CustomerFormDialogProps) {
  const [values, setValues] = useState(() => pickFormValues(customer));
  const [errors, setErrors] = useState<FormErrors<keyof CustomerFields>>({});
  const addCustomer = useAddCustomer();
  const updateCustomer = useUpdateCustomer();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateCustomer(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) {
      return;
    }

    const fields = trimValues(values);
    if (customer) {
      updateCustomer.mutate({ id: customer.id, fields }, { onSuccess: onClose });
    } else {
      addCustomer.mutate(fields, { onSuccess: onClose });
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle>{customer ? 'Edit customer' : 'Add customer'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            {FIELDS.map(({ name, label, type, fullRow }, index) => (
              <Grid key={name} size={{ xs: 12, sm: fullRow ? 12 : 6 }}>
                <TextField
                  name={name}
                  label={label}
                  type={type}
                  autoComplete="off"
                  autoFocus={index === 0}
                  value={values[name]}
                  onChange={handleChange}
                  error={Boolean(errors[name])}
                  helperText={errors[name]}
                  required
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            loading={addCustomer.isPending || updateCustomer.isPending}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
