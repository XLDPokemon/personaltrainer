import type { Dayjs } from 'dayjs';
import type { Customer, CustomerFields } from '../types';

export type FormErrors<TField extends string> = Partial<Record<TField, string>>;

export type TrainingFormValues = {
  customer: Customer | null;
  date: Dayjs | null;
  activity: string;
  duration: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const MAX_DURATION_MINUTES = 600;

export function validateCustomer(values: CustomerFields): FormErrors<keyof CustomerFields> {
  const errors: FormErrors<keyof CustomerFields> = {};

  for (const field of Object.keys(values) as (keyof CustomerFields)[]) {
    if (!values[field].trim()) {
      errors[field] = 'Required';
    }
  }
  if (!errors.email && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!errors.phone && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Use only numbers, spaces and + ( ) -';
  }
  return errors;
}

export function validateTraining(values: TrainingFormValues): FormErrors<keyof TrainingFormValues> {
  const errors: FormErrors<keyof TrainingFormValues> = {};

  if (!values.customer) {
    errors.customer = 'Select a customer';
  }
  if (!values.date?.isValid()) {
    errors.date = 'Enter a valid date and time';
  }
  if (!values.activity.trim()) {
    errors.activity = 'Required';
  }
  const duration = Number(values.duration);
  if (!Number.isInteger(duration) || duration < 1 || duration > MAX_DURATION_MINUTES) {
    errors.duration = `Enter whole minutes between 1 and ${MAX_DURATION_MINUTES}`;
  }
  return errors;
}

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}
