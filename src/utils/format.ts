import dayjs from 'dayjs';
import type { CustomerFields } from '../types';

export const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm';

export function formatDateTime(date: string | Date): string {
  return dayjs(date).format(DATE_TIME_FORMAT);
}

export function formatCustomerName(customer: CustomerFields | null): string {
  return customer ? `${customer.firstname} ${customer.lastname}` : 'Unknown customer';
}
