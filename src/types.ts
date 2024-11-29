export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  price: number;
  description: string;
  paymentLink?: string;
}

export interface User {
  username: string;
  password: string;
}