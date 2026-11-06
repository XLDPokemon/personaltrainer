import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { ActivitySummary } from '../../utils/trainings';

export default function ActivityTable({ summaries }: { summaries: ActivitySummary[] }) {
  return (
    <Paper variant="outlined">
      <Table size="small" aria-label="Trainings per activity">
        <TableHead>
          <TableRow>
            <TableCell>Activity</TableCell>
            <TableCell align="right">Sessions</TableCell>
            <TableCell align="right">Minutes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaries.map(({ activity, sessions, minutes }) => (
            <TableRow key={activity}>
              <TableCell>{activity}</TableCell>
              <TableCell align="right">{sessions}</TableCell>
              <TableCell align="right">{minutes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
