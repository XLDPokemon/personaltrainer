import { useQuery } from '@tanstack/react-query';
import {
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from '../api/customers';
import type { CustomerFields } from '../types';
import { useApiMutation } from './useApiMutation';

export function useCustomers() {
  return useQuery({ queryKey: ['customers'], queryFn: fetchCustomers });
}

export function useAddCustomer() {
  return useApiMutation(createCustomer, 'Customer added');
}

export function useUpdateCustomer() {
  return useApiMutation(
    ({ id, fields }: { id: number; fields: CustomerFields }) => updateCustomer(id, fields),
    'Customer updated',
  );
}

export function useDeleteCustomer() {
  return useApiMutation(deleteCustomer, 'Customer and their trainings deleted');
}
