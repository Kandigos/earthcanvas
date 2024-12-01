export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  price: number;
  description: string;
  totalSpots: number;
  spotsLeft: number;
  paymentLink?: string;
  earlyBirdPrice?: number;
  earlyBirdEnds?: string;
  isEarlyBird?: boolean;
}

export interface User {
  username: string;
  password: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  eventId: string;
  eventTitle: string;
  registrationDate: string;
  eventDate: string;
  eventTime: string;
  eventPrice: number;
}