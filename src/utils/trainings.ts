import { groupBy, map, orderBy, sumBy, uniq } from 'lodash-es';
import type { Training } from '../types';

export type ActivitySummary = {
  activity: string;
  sessions: number;
  minutes: number;
};

export type TrainingTotals = {
  trainings: number;
  minutes: number;
  customers: number;
};

/** Totals per activity, the most trained activity first. */
export function summarizeByActivity(trainings: Training[]): ActivitySummary[] {
  const summaries = map(groupBy(trainings, 'activity'), (group, activity) => ({
    activity,
    sessions: group.length,
    minutes: sumBy(group, 'duration'),
  }));
  return orderBy(summaries, 'minutes', 'desc');
}

export function calculateTotals(trainings: Training[]): TrainingTotals {
  return {
    trainings: trainings.length,
    minutes: sumBy(trainings, 'duration'),
    customers: uniq(trainings.map((training) => training.customer?.id)).length,
  };
}

export function listActivities(trainings: Training[]): string[] {
  return uniq(trainings.map((training) => training.activity)).sort((a, b) => a.localeCompare(b));
}
