export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  price: number;
  description: string;
  capacity?: number;
}

export interface User {
  username: string;
  password: string;
}