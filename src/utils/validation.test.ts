import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import type { Customer, CustomerFields } from '../types';
import { hasErrors, validateCustomer, validateTraining } from './validation';

const validCustomer: CustomerFields = {
  firstname: 'Mary',
  lastname: 'Philips',
  email: 'm.philips@mail.com',
  phone: '+358 40-123 4567',
  streetaddress: 'Hill Street 3',
  postcode: '23322',
  city: 'Flintsone',
};

const validTraining = {
  customer: { ...validCustomer, id: 1, url: 'https://example.test/customers/1' } as Customer,
  date: dayjs('2026-11-06T10:00:00'),
  activity: 'Zumba',
  duration: '60',
};

describe('validateCustomer', () => {
  it('accepts a complete customer', () => {
    expect(hasErrors(validateCustomer(validCustomer))).toBe(false);
  });

  it('requires every field and ignores surrounding spaces', () => {
    expect(validateCustomer({ ...validCustomer, city: '   ' })).toEqual({ city: 'Required' });
  });

  it('rejects malformed email and phone', () => {
    const errors = validateCustomer({ ...validCustomer, email: 'mary@mail', phone: 'call me' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'phone']);
  });
});

describe('validateTraining', () => {
  it('accepts a complete training', () => {
    expect(hasErrors(validateTraining(validTraining))).toBe(false);
  });

  it('requires a customer, a valid date and an activity', () => {
    const errors = validateTraining({
      ...validTraining,
      customer: null,
      date: dayjs('not a date'),
      activity: '',
    });
    expect(Object.keys(errors).sort()).toEqual(['activity', 'customer', 'date']);
  });

  it.each(['', '0', '-5', '12.5', '601', 'abc'])('rejects duration "%s"', (duration) => {
    expect(validateTraining({ ...validTraining, duration }).duration).toBeDefined();
  });
});
