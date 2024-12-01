export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  price: number;
  description: string;
  totalSpots: number;
  spotsLeft: number;
  maxParticipants: number;
  currentParticipants: number;
  paymentLink?: string;
  earlyBirdPrice?: number;
  earlyBirdEnds?: string;
  isEarlyBird?: boolean;
  currentViewers?: number;
}

export interface RegistrationData {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  eventDate: string;
  eventTime: string;
  eventPrice: number;
  notes?: string;
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
  eventTitle: string;
  date: string;
}

export interface RegistrationFormProps {
  event: Event;
  onSuccess?: () => void;
  onCancel?: () => void;
  isEarlyBird?: boolean;
}

export interface EventSocialProofProps {
  eventId: string;
  testimonials: Testimonial[];
  currentViewers?: number;
  recentRegistrations?: {
    name: string;
    timeAgo: string;
  }[];
}