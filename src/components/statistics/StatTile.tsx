import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type StatTileProps = {
  label: string;
  value: string | number;
};

export default function StatTile({ label, value }: StatTileProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography variant="h5" component="p" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Paper>
  );
}
