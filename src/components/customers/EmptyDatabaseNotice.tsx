import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useResetDatabase } from '../../hooks/useResetDatabase';
import ConfirmDialog from '../common/ConfirmDialog';

/** Offers to restore the demo data, as instructed by the REST API documentation. */
export default function EmptyDatabaseNotice() {
  const [isConfirming, setIsConfirming] = useState(false);
  const resetDatabase = useResetDatabase();

  return (
    <>
      <Alert
        severity="info"
        sx={{ mb: 2 }}
        action={
          <Button color="inherit" size="small" onClick={() => setIsConfirming(true)}>
            Restore demo data
          </Button>
        }
      >
        The database has no customers.
      </Alert>

      {isConfirming && (
        <ConfirmDialog
          title="Restore demo data?"
          message="This replaces everything in the shared database with the original demo data."
          confirmLabel="Yes, restore"
          pending={resetDatabase.isPending}
          onConfirm={() =>
            resetDatabase.mutate(undefined, { onSettled: () => setIsConfirming(false) })
          }
          onClose={() => setIsConfirming(false)}
        />
      )}
    </>
  );
}
