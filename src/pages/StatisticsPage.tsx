import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import LoadError from '../components/common/LoadError';
import PageHeader from '../components/common/PageHeader';
import ActivityChart from '../components/statistics/ActivityChart';
import ActivityTable from '../components/statistics/ActivityTable';
import StatTile from '../components/statistics/StatTile';
import { useTrainings } from '../hooks/useTrainings';
import { calculateTotals, summarizeByActivity } from '../utils/trainings';

const MINUTES_PER_HOUR = 60;

export default function StatisticsPage() {
  const { data: trainings = [], isPending, error, refetch } = useTrainings();

  const activitySummaries = useMemo(() => summarizeByActivity(trainings), [trainings]);
  const totals = useMemo(() => calculateTotals(trainings), [trainings]);

  const tiles = [
    { label: 'Trainings', value: totals.trainings },
    { label: 'Total hours', value: Math.round(totals.minutes / MINUTES_PER_HOUR) },
    { label: 'Customers training', value: totals.customers },
    { label: 'Most trained activity', value: activitySummaries[0]?.activity },
  ];

  return (
    <>
      <PageHeader title="Statistics" subtitle="How training time is divided between activities." />

      {error && <LoadError error={error} onRetry={refetch} />}
      {isPending && <LinearProgress />}

      {!isPending && !error && trainings.length === 0 && (
        <Typography sx={{ color: 'text.secondary' }}>There are no trainings to summarize yet.</Typography>
      )}

      {trainings.length > 0 && (
        <Grid container spacing={2}>
          {tiles.map(({ label, value }) => (
            <Grid key={label} size={{ xs: 6, md: 3 }}>
              <StatTile label={label} value={value} />
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 8 }}>
            <ActivityChart summaries={activitySummaries} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ActivityTable summaries={activitySummaries} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
