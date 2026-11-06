import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { useSearchParams } from 'react-router';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadError from '../components/common/LoadError';
import PageHeader from '../components/common/PageHeader';
import TrainingFormDialog from '../components/trainings/TrainingFormDialog';
import TrainingTable from '../components/trainings/TrainingTable';
import { useCustomers } from '../hooks/useCustomers';
import { useDeleteTraining, useTrainings } from '../hooks/useTrainings';
import type { Training } from '../types';
import { formatCustomerName, formatDateTime } from '../utils/format';

const CUSTOMER_FILTER_PARAM = 'customerId';

export default function TrainingsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [trainingToDelete, setTrainingToDelete] = useState<Training | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: trainings = [], isPending, error, refetch } = useTrainings();
  const { data: customers = [] } = useCustomers();
  const deleteTraining = useDeleteTraining();

  const customerFilter = Number(searchParams.get(CUSTOMER_FILTER_PARAM)) || null;
  const filteredCustomer = customers.find((customer) => customer.id === customerFilter);

  const visibleTrainings = useMemo(
    () =>
      customerFilter
        ? trainings.filter((training) => training.customer?.id === customerFilter)
        : trainings,
    [trainings, customerFilter],
  );

  return (
    <>
      <PageHeader
        title="Trainings"
        subtitle="All training sessions with their customers."
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddDialogOpen(true)}>
            Add training
          </Button>
        }
      />

      {error && <LoadError error={error} onRetry={refetch} />}

      {customerFilter && (
        <Chip
          label={`Customer: ${filteredCustomer ? formatCustomerName(filteredCustomer) : customerFilter}`}
          onDelete={() => setSearchParams({})}
          color="primary"
          variant="outlined"
          sx={{ mb: 2 }}
        />
      )}

      <TrainingTable
        trainings={visibleTrainings}
        loading={isPending}
        onDelete={setTrainingToDelete}
      />

      {isAddDialogOpen && (
        <TrainingFormDialog customer={filteredCustomer} onClose={() => setIsAddDialogOpen(false)} />
      )}
      {trainingToDelete && (
        <ConfirmDialog
          title="Delete training?"
          message={`${trainingToDelete.activity} on ${formatDateTime(trainingToDelete.date)} for ${formatCustomerName(trainingToDelete.customer)} will be permanently deleted.`}
          confirmLabel="Yes, delete"
          pending={deleteTraining.isPending}
          onConfirm={() =>
            deleteTraining.mutate(trainingToDelete.id, { onSettled: () => setTrainingToDelete(null) })
          }
          onClose={() => setTrainingToDelete(null)}
        />
      )}
    </>
  );
}
