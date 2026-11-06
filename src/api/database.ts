import { RESET_URL, sendRequest } from './client';

/** Replaces all data in the shared database with the original demo data. */
export async function resetDatabase(): Promise<void> {
  await sendRequest(RESET_URL, { method: 'POST' });
}
