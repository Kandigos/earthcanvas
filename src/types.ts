export interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  maxParticipants?: number;
  price?: number;
  location?: string;
  image?: string;
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