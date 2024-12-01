import { X } from 'lucide-react';
import { Event } from '../types';
import { EventCard } from './EventCard';

interface PreviewModalProps {
  event: Partial<Event>;
  onClose: () => void;
}

export function PreviewModal({ event, onClose }: PreviewModalProps) {
  // Create a complete Event object from partial data
  const previewEvent: Event = {
    id: 'preview',
    title: event.title || 'ללא כותרת',
    date: event.date || 'לא נקבע תאריך',
    time: event.time || 'לא נקבעה שעה',
    price: event.price || 0,
    description: event.description || 'אין תיאור',
    maxParticipants: event.maxParticipants || 50,
    currentParticipants: event.currentParticipants || 0,
    totalSpots: event.totalSpots || 50,
    spotsLeft: event.spotsLeft || 50,
    paymentLink: event.paymentLink,
    earlyBirdPrice: event.earlyBirdPrice,
    earlyBirdEnds: event.earlyBirdEnds,
    currentViewers: event.currentViewers || 0
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-nature-cream rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-nature-charcoal/60 hover:text-nature-charcoal"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-nature-charcoal">תצוגה מקדימה</h2>
        
        <div className="max-h-[70vh] overflow-y-auto">
          <EventCard event={previewEvent} />
        </div>
      </div>
    </div>
  );
}