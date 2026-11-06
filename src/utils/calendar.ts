import dayjs from 'dayjs';
import type { Training } from '../types';
import { formatCustomerName } from './format';

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  training: Training;
};

export function toCalendarEvent(training: Training): CalendarEvent {
  const start = dayjs(training.date);
  return {
    title: `${training.activity} – ${formatCustomerName(training.customer)}`,
    start: start.toDate(),
    end: start.add(training.duration, 'minute').toDate(),
    training,
  };
}

/**
 * Picks where the calendar opens so it does not start on an empty page:
 * the next upcoming training, otherwise the most recent one, otherwise today.
 */
export function findInitialCalendarDate(trainings: Training[], now = new Date()): Date {
  const times = trainings.map((training) => new Date(training.date).getTime());
  const upcoming = times.filter((time) => time >= now.getTime());

  if (upcoming.length > 0) {
    return new Date(Math.min(...upcoming));
  }
  return times.length > 0 ? new Date(Math.max(...times)) : now;
}
