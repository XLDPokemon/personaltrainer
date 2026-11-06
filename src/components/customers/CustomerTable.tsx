import { useMemo, type ReactElement } from 'react';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';
import type { Customer } from '../../types';
import DataTable from '../common/DataTable';

export type CustomerAction = 'viewTrainings' | 'addTraining' | 'edit' | 'delete';

type CustomerTableProps = {
  customers: Customer[];
  loading: boolean;
  onAction: (action: CustomerAction, customer: Customer) => void;
};

const ROW_ACTIONS: { action: CustomerAction; label: string; icon: ReactElement }[] = [
  { action: 'viewTrainings', label: 'View trainings', icon: <ListAltIcon /> },
  { action: 'addTraining', label: 'Add training', icon: <EventAvailableIcon /> },
  { action: 'edit', label: 'Edit', icon: <EditIcon /> },
  { action: 'delete', label: 'Delete', icon: <DeleteIcon color="error" /> },
];

const DATA_COLUMNS: GridColDef<Customer>[] = [
  { field: 'firstname', headerName: 'First name', flex: 1, minWidth: 110 },
  { field: 'lastname', headerName: 'Last name', flex: 1, minWidth: 110 },
  { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 180 },
  { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 120 },
  { field: 'streetaddress', headerName: 'Street address', flex: 1.5, minWidth: 160 },
  { field: 'postcode', headerName: 'Postcode', width: 100 },
  { field: 'city', headerName: 'City', flex: 1, minWidth: 110 },
];

export default function CustomerTable({ customers, loading, onAction }: CustomerTableProps) {
  const columns = useMemo<GridColDef<Customer>[]>(
    () => [
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 160,
        disableExport: true,
        getActions: ({ row: customer }) =>
          ROW_ACTIONS.map(({ action, label, icon }) => (
            <GridActionsCellItem
              key={action}
              label={label}
              icon={<Tooltip title={label}>{icon}</Tooltip>}
              onClick={() => onAction(action, customer)}
            />
          )),
      },
      ...DATA_COLUMNS,
    ],
    [onAction],
  );

  return (
    <DataTable
      rows={customers}
      columns={columns}
      loading={loading}
      exportFileName="customers"
      noRowsLabel="No customers"
    />
  );
}
