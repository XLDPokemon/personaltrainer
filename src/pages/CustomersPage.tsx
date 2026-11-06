import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadError from '../components/common/LoadError';
import PageHeader from '../components/common/PageHeader';
import CustomerFormDialog from '../components/customers/CustomerFormDialog';
import CustomerTable, { type CustomerAction } from '../components/customers/CustomerTable';
import EmptyDatabaseNotice from '../components/customers/EmptyDatabaseNotice';
import TrainingFormDialog from '../components/trainings/TrainingFormDialog';
import { useCustomers, useDeleteCustomer } from '../hooks/useCustomers';
import type { Customer } from '../types';
import { formatCustomerName } from '../utils/format';

type ActiveDialog =
  | { type: 'addCustomer' }
  | { type: Exclude<CustomerAction, 'viewTrainings'>; customer: Customer };

export default function CustomersPage() {
  const [activeDialog, setActiveDialog] = useState<ActiveDialog | null>(null);
  const navigate = useNavigate();
  const { data: customers = [], isPending, error, refetch } = useCustomers();
  const deleteCustomer = useDeleteCustomer();

  const closeDialog = () => setActiveDialog(null);

  const handleAction = useCallback(
    (action: CustomerAction, customer: Customer) => {
      if (action === 'viewTrainings') {
        navigate(`/trainings?customerId=${customer.id}`);
      } else {
        setActiveDialog({ type: action, customer });
      }
    },
    [navigate],
  );

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Search, sort and manage customers. Use Export in the table toolbar to download all customers as a CSV file."
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setActiveDialog({ type: 'addCustomer' })}
          >
            Add customer
          </Button>
        }
      />

      {error && <LoadError error={error} onRetry={refetch} />}
      {!isPending && !error && customers.length === 0 && <EmptyDatabaseNotice />}

      <CustomerTable customers={customers} loading={isPending} onAction={handleAction} />

      {activeDialog?.type === 'addCustomer' && <CustomerFormDialog onClose={closeDialog} />}
      {activeDialog?.type === 'edit' && (
        <CustomerFormDialog customer={activeDialog.customer} onClose={closeDialog} />
      )}
      {activeDialog?.type === 'addTraining' && (
        <TrainingFormDialog customer={activeDialog.customer} onClose={closeDialog} />
      )}
      {activeDialog?.type === 'delete' && (
        <ConfirmDialog
          title="Delete customer?"
          message={`${formatCustomerName(activeDialog.customer)} and all of their trainings will be permanently deleted.`}
          confirmLabel="Yes, delete"
          pending={deleteCustomer.isPending}
          onConfirm={() => deleteCustomer.mutate(activeDialog.customer.id, { onSettled: closeDialog })}
          onClose={closeDialog}
        />
      )}
    </>
  );
}
