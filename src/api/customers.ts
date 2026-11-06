import type { Customer, CustomerFields } from '../types';
import { deleteResource, getJson, sendJson } from './client';

type CustomerResource = CustomerFields & {
  _links: { self: { href: string } };
};

type CustomersResponse = {
  _embedded: { customers: CustomerResource[] };
};

/** The API exposes customer ids only through the self link, so the id is read from there. */
export function toCustomer({ _links, ...fields }: CustomerResource): Customer {
  const url = _links.self.href;
  return { ...fields, url, id: Number(url.split('/').pop()) };
}

export async function fetchCustomers(): Promise<Customer[]> {
  const data = await getJson<CustomersResponse>('/customers');
  return data._embedded.customers.map(toCustomer);
}

export async function createCustomer(fields: CustomerFields): Promise<void> {
  await sendJson('/customers', 'POST', fields);
}

export async function updateCustomer(id: number, fields: CustomerFields): Promise<void> {
  await sendJson(`/customers/${id}`, 'PUT', fields);
}

export async function deleteCustomer(id: number): Promise<void> {
  await deleteResource(`/customers/${id}`);
}
