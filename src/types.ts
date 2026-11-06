export type CustomerFields = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
};

export type Customer = CustomerFields & {
  id: number;
  /** Absolute resource URL, used as the customer reference when adding a training. */
  url: string;
};

export type Training = {
  id: number;
  /** ISO-8601 date and time. */
  date: string;
  /** Duration in minutes. */
  duration: number;
  activity: string;
  customer: (CustomerFields & { id: number }) | null;
};

export type NewTraining = {
  date: string;
  duration: number;
  activity: string;
  /** URL of the customer the training belongs to. */
  customer: string;
};
