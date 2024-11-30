export interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  maxParticipants?: number;
  price?: number;
  earlyBirdPrice?: number;
  totalSpots?: number;
  spotsLeft?: number;
  currentViewers?: number;
  location?: string;
  image?: string;
  paymentLink?: string;
  earlyBirdEnds?: string;
  testimonials?: Testimonial[];
}

export interface Registration {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  participants: number;
  eventDate: string;
  specialRequests: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  registrationDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  image?: string;
  role?: string;
  date?: string;
  rating: number;
}

export interface EventCardProps {
  event: Event;
  testimonials?: Testimonial[];
}