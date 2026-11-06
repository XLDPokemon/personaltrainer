import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router';
import type { Training } from '../../types';
import { formatCustomerName, formatDateTime } from '../../utils/format';

type TrainingDetailsDialogProps = {
  training: Training;
  onClose: () => void;
};

export default function TrainingDetailsDialog({ training, onClose }: TrainingDetailsDialogProps) {
  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{training.activity}</DialogTitle>
      <DialogContent>
        <DialogContentText>{formatDateTime(training.date)}</DialogContentText>
        <DialogContentText>{training.duration} minutes</DialogContentText>
        <DialogContentText>{formatCustomerName(training.customer)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {training.customer && (
          <Button component={Link} to={`/trainings?customerId=${training.customer.id}`}>
            Customer's trainings
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
