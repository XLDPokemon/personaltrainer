import { describe, expect, it } from 'vitest';
import { toCustomer } from './customers';

describe('toCustomer', () => {
  it('reads the id from the self link and drops the links', () => {
    const url = 'https://example.test/api/customers/1002';
    const customer = toCustomer({
      firstname: 'Mark',
      lastname: 'Johnson',
      email: 'mark@mail.com',
      phone: '232-2345540',
      streetaddress: '5th Street',
      postcode: '23110',
      city: 'Flintsone',
      _links: { self: { href: url } },
    });

    expect(customer.id).toBe(1002);
    expect(customer.url).toBe(url);
    expect(customer).not.toHaveProperty('_links');
  });
});
