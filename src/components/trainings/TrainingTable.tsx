import { useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';
import type { Training } from '../../types';
import { formatCustomerName, formatDateTime } from '../../utils/format';
import DataTable from '../common/DataTable';

type TrainingTableProps = {
  trainings: Training[];
  loading: boolean;
  onDelete: (training: Training) => void;
};

const DATA_COLUMNS: GridColDef<Training>[] = [
  {
    field: 'date',
    headerName: 'Date',
    type: 'dateTime',
    flex: 1,
    minWidth: 160,
    valueGetter: (value: string) => new Date(value),
    valueFormatter: (value: Date) => formatDateTime(value),
    // Dates are skipped by the toolbar search by default, so match what the user sees.
    getApplyQuickFilterFn: (searchValue: string) => (value: Date) =>
      formatDateTime(value).includes(searchValue),
  },
  { field: 'activity', headerName: 'Activity', flex: 1, minWidth: 140 },
  { field: 'duration', headerName: 'Duration (min)', type: 'number', width: 130 },
  {
    field: 'customerName',
    headerName: 'Customer',
    flex: 1,
    minWidth: 160,
    valueGetter: (_value, training) => formatCustomerName(training.customer),
  },
];

export default function TrainingTable({ trainings, loading, onDelete }: TrainingTableProps) {
  const columns = useMemo<GridColDef<Training>[]>(
    () => [
      ...DATA_COLUMNS,
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Delete',
        width: 80,
        disableExport: true,
        getActions: ({ row: training }) => [
          <GridActionsCellItem
            key="delete"
            label="Delete"
            icon={<Tooltip title="Delete"><DeleteIcon color="error" /></Tooltip>}
            onClick={() => onDelete(training)}
          />,
        ],
      },
    ],
    [onDelete],
  );

  return (
    <DataTable
      rows={trainings}
      columns={columns}
      loading={loading}
      exportFileName="trainings"
      noRowsLabel="No trainings"
    />
  );
}
