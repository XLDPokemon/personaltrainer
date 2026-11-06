import { describe, expect, it } from 'vitest';
import { createTraining } from '../test/createTraining';
import { calculateTotals, listActivities, summarizeByActivity } from './trainings';

describe('summarizeByActivity', () => {
  it('sums sessions and minutes per activity, largest first', () => {
    const summary = summarizeByActivity([
      createTraining({ activity: 'Zumba', duration: 30 }),
      createTraining({ activity: 'Gym', duration: 90 }),
      createTraining({ activity: 'Zumba', duration: 45 }),
    ]);

    expect(summary).toEqual([
      { activity: 'Gym', sessions: 1, minutes: 90 },
      { activity: 'Zumba', sessions: 2, minutes: 75 },
    ]);
  });

  it('returns nothing without trainings', () => {
    expect(summarizeByActivity([])).toEqual([]);
  });
});

describe('calculateTotals', () => {
  it('counts trainings, minutes and distinct customers', () => {
    const customer = {
      id: 1,
      firstname: 'Mary',
      lastname: 'Philips',
      email: 'm.philips@mail.com',
      phone: '232-310122',
      streetaddress: 'Hill Street 3',
      postcode: '23322',
      city: 'Flintsone',
    };

    const totals = calculateTotals([
      createTraining({ duration: 30, customer }),
      createTraining({ duration: 45, customer }),
      createTraining({ duration: 15, customer: { ...customer, id: 2 } }),
    ]);

    expect(totals).toEqual({ trainings: 3, minutes: 90, customers: 2 });
  });
});

describe('listActivities', () => {
  it('returns unique activities alphabetically', () => {
    const trainings = ['Zumba', 'Gym', 'Zumba'].map((activity) => createTraining({ activity }));

    expect(listActivities(trainings)).toEqual(['Gym', 'Zumba']);
  });
});
