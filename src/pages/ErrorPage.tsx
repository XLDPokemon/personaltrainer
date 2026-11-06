import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ErrorPage() {
  return (
    <Stack spacing={2} sx={{ py: 8, alignItems: 'center' }}>
      <Typography variant="h5" component="h1">
        Something went wrong
      </Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Reload the page
      </Button>
    </Stack>
  );
}
