import type { NewTraining, Training } from '../types';
import { deleteResource, getJson, sendJson } from './client';

export function fetchTrainings(): Promise<Training[]> {
  return getJson<Training[]>('/gettrainings');
}

export async function createTraining(training: NewTraining): Promise<void> {
  await sendJson('/trainings', 'POST', training);
}

export async function deleteTraining(id: number): Promise<void> {
  await deleteResource(`/trainings/${id}`);
}
