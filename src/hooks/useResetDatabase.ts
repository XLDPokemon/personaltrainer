import { resetDatabase } from '../api/database';
import { useApiMutation } from './useApiMutation';

export function useResetDatabase() {
  return useApiMutation(resetDatabase, 'Demo data restored');
}
