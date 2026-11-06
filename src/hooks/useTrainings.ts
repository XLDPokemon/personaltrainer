import { useQuery } from '@tanstack/react-query';
import { createTraining, deleteTraining, fetchTrainings } from '../api/trainings';
import { useApiMutation } from './useApiMutation';

export function useTrainings() {
  return useQuery({ queryKey: ['trainings'], queryFn: fetchTrainings });
}

export function useAddTraining() {
  return useApiMutation(createTraining, 'Training added');
}

export function useDeleteTraining() {
  return useApiMutation(deleteTraining, 'Training deleted');
}
