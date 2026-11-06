import { describe, expect, it } from 'vitest';
import { createTraining } from '../test/createTraining';
import { findInitialCalendarDate, toCalendarEvent } from './calendar';

describe('toCalendarEvent', () => {
  it('ends the event after the training duration', () => {
    const event = toCalendarEvent(createTraining({ duration: 45 }));

    expect(event.end.getTime() - event.start.getTime()).toBe(45 * 60 * 1000);
    expect(event.title).toBe('Zumba – Unknown customer');
  });
});

describe('findInitialCalendarDate', () => {
  const now = new Date('2026-11-06T12:00:00Z');
  const past = createTraining({ date: '2026-10-01T10:00:00Z' });
  const nextUp = createTraining({ date: '2026-11-10T10:00:00Z' });
  const later = createTraining({ date: '2026-12-24T10:00:00Z' });

  it('prefers the next upcoming training', () => {
    expect(findInitialCalendarDate([later, past, nextUp], now)).toEqual(new Date(nextUp.date));
  });

  it('falls back to the most recent training', () => {
    expect(findInitialCalendarDate([past], now)).toEqual(new Date(past.date));
  });

  it('falls back to today without trainings', () => {
    expect(findInitialCalendarDate([], now)).toEqual(now);
  });
});
