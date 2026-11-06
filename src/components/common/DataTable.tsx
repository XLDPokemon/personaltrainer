import Paper from '@mui/material/Paper';
import {
  DataGrid,
  gridDataRowIdsSelector,
  type GridColDef,
  type GridValidRowModel,
} from '@mui/x-data-grid';

type DataTableProps<TRow extends GridValidRowModel> = {
  rows: TRow[];
  columns: GridColDef<TRow>[];
  loading: boolean;
  /** Name of the CSV file downloaded from the toolbar, without the extension. */
  exportFileName: string;
  noRowsLabel: string;
};

const PAGE_SIZE_OPTIONS = [10, 25, 50];

/**
 * DataGrid with the sorting, filtering, search and CSV export setup shared by all lists.
 * The export always contains every row and data column, whatever is currently searched or
 * hidden. Columns with `disableExport`, such as action buttons, are left out.
 */
export default function DataTable<TRow extends GridValidRowModel>({
  rows,
  columns,
  loading,
  exportFileName,
  noRowsLabel,
}: DataTableProps<TRow>) {
  return (
    <Paper variant="outlined" sx={{ height: 'calc(100vh - 210px)', minHeight: 420 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        showToolbar
        disableRowSelectionOnClick
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        initialState={{ pagination: { paginationModel: { pageSize: PAGE_SIZE_OPTIONS[0] } } }}
        localeText={{ noRowsLabel }}
        slotProps={{
          toolbar: {
            csvOptions: {
              fileName: exportFileName,
              utf8WithBom: true,
              allColumns: true,
              getRowsToExport: ({ apiRef }) => gridDataRowIdsSelector(apiRef),
            },
            printOptions: { disableToolbarButton: true },
          },
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
