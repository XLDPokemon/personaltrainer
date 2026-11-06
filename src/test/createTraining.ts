import type { Training } from '../types';

/** Builds a training for unit tests, with only the relevant values overridden. */
export function createTraining(overrides: Partial<Training> = {}): Training {
  return {
    id: 1,
    date: '2026-11-06T10:00:00.000+00:00',
    duration: 60,
    activity: 'Zumba',
    customer: null,
    ...overrides,
  };
}
