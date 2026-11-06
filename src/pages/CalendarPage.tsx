import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import TrainingCalendar from '../components/calendar/TrainingCalendar';
import TrainingDetailsDialog from '../components/calendar/TrainingDetailsDialog';
import LoadError from '../components/common/LoadError';
import PageHeader from '../components/common/PageHeader';
import { useTrainings } from '../hooks/useTrainings';
import type { Training } from '../types';

export default function CalendarPage() {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const { data: trainings = [], isPending, error, refetch } = useTrainings();

  return (
    <>
      <PageHeader
        title="Calendar"
        subtitle="Trainings by month, week or day. Select a training to see its details."
      />

      {error && <LoadError error={error} onRetry={refetch} />}
      {isPending && <LinearProgress />}

      <TrainingCalendar trainings={trainings} onSelectTraining={setSelectedTraining} />

      {selectedTraining && (
        <TrainingDetailsDialog
          training={selectedTraining}
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </>
  );
}
