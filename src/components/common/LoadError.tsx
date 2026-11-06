import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

type LoadErrorProps = {
  error: Error;
  onRetry: () => void;
};

export default function LoadError({ error, onRetry }: LoadErrorProps) {
  return (
    <Alert
      severity="error"
      sx={{ mb: 2 }}
      action={
        <Button color="inherit" size="small" onClick={onRetry}>
          Try again
        </Button>
      }
    >
      Could not load data. {error.message}
    </Alert>
  );
}
