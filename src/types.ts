export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  price: number;
  description: string;
  paymentLink?: string;
  // New fields for enhanced features
  earlyBirdPrice?: number;
  totalSpots: number;
  spotsLeft: number;
  earlyBirdEnds?: string;
  lastRegistrationTime?: string;
  currentViewers?: number;
}

export interface User {
  username: string;
  password: string;
}

export interface Testimonial {
  id: string;
  name: string;
  image?: string;
  text: string;
  eventTitle: string;
  date: string;
  rating: number;
}