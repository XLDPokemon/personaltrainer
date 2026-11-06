import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import type { ActivitySummary } from '../../utils/trainings';

const CHART_HEIGHT = 380;

export default function ActivityChart({ summaries }: { summaries: ActivitySummary[] }) {
  const { palette } = useTheme();

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600 }}>
        Minutes trained per activity
      </Typography>
      <BarChart
        dataset={summaries}
        height={CHART_HEIGHT}
        borderRadius={4}
        hideLegend
        grid={{ horizontal: true }}
        xAxis={[{ scaleType: 'band', dataKey: 'activity', categoryGapRatio: 0.4 }]}
        yAxis={[{ label: 'Duration (min)' }]}
        series={[{ dataKey: 'minutes', label: 'Minutes', color: palette.primary.main }]}
      />
    </Paper>
  );
}
