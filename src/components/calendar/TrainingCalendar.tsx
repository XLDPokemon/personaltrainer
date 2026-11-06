import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import { Calendar, Views, dayjsLocalizer, type Formats, type View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { Training } from '../../types';
import {
  findInitialCalendarDate,
  toCalendarEvent,
  type CalendarEvent,
} from '../../utils/calendar';

type TrainingCalendarProps = {
  trainings: Training[];
  onSelectTraining: (training: Training) => void;
};

const localizer = dayjsLocalizer(dayjs);

const TIME_FORMAT = 'HH:mm';

const formatTimeRange = ({ start, end }: { start: Date; end: Date }) =>
  `${dayjs(start).format(TIME_FORMAT)} – ${dayjs(end).format(TIME_FORMAT)}`;

const CALENDAR_FORMATS: Formats = {
  timeGutterFormat: TIME_FORMAT,
  eventTimeRangeFormat: formatTimeRange,
  agendaTimeRangeFormat: formatTimeRange,
  agendaTimeFormat: TIME_FORMAT,
};

const CALENDAR_VIEWS = [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA];

export default function TrainingCalendar({ trainings, onSelectTraining }: TrainingCalendarProps) {
  const [view, setView] = useState<View>(Views.MONTH);
  const [navigatedDate, setNavigatedDate] = useState<Date | null>(null);

  const events = useMemo(() => trainings.map(toCalendarEvent), [trainings]);
  const displayedDate = navigatedDate ?? findInitialCalendarDate(trainings);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: 'calc(100vh - 210px)',
        minHeight: 560,
        '& .rbc-event, & .rbc-agenda-event-cell': { fontSize: '0.8125rem' },
        '& .rbc-event': { backgroundColor: 'primary.main' },
        '& .rbc-event.rbc-selected': { backgroundColor: 'primary.dark' },
      }}
    >
      <Calendar<CalendarEvent>
        localizer={localizer}
        events={events}
        view={view}
        views={CALENDAR_VIEWS}
        date={displayedDate}
        formats={CALENDAR_FORMATS}
        onView={setView}
        onNavigate={setNavigatedDate}
        onSelectEvent={(event) => onSelectTraining(event.training)}
        popup
      />
    </Paper>
  );
}
