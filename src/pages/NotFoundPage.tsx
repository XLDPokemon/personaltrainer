import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <Stack spacing={2} sx={{ py: 8, alignItems: 'center' }}>
      <Typography variant="h5" component="h1">
        Page not found
      </Typography>
      <Button component={Link} to="/" variant="contained">
        Go to customers
      </Button>
    </Stack>
  );
}
