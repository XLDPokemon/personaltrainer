import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../context/NotificationContext';

/**
 * Wraps a write request: shows the outcome to the user and refreshes every list,
 * because customer changes also affect the trainings that are shown with them.
 */
export function useApiMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>,
  successMessage: string,
) {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      notify(successMessage);
      return queryClient.invalidateQueries();
    },
    onError: (error) => notify(error.message, 'error'),
  });
}
