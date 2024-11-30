import { Calendar, Clock, PiggyBank } from 'lucide-react';
import { Event } from '../types';
import { EventPricingInfo } from './EventPricingInfo';
import { EventSocialProof } from './EventSocialProof';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  testimonials?: any[];
  recentRegistrations?: any[];
}

export function EventCard({ 
  event,
  testimonials = [],
  recentRegistrations = []
}: EventCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-earth-200/50 transition-all duration-300"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-earth-800 mb-4">{event.title}</h3>
        
        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-earth-600">
            <Calendar className="w-5 h-5 text-sage-600" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-earth-600">
            <Clock className="w-5 h-5 text-sage-600" />
            <span>{event.time}</span>
          </div>
          {!event.earlyBirdPrice && (
            <div className="flex items-center gap-2 text-earth-600">
              <PiggyBank className="w-5 h-5 text-sage-600" />
              <span>₪{event.price}</span>
            </div>
          )}
        </div>

        {/* Early Bird Pricing if available */}
        {event.earlyBirdPrice && event.earlyBirdEnds && (
          <div className="mb-6">
            <EventPricingInfo
              eventDate={event.earlyBirdEnds}
              originalPrice={event.price}
              earlyBirdPrice={event.earlyBirdPrice}
              totalSpots={event.totalSpots}
              spotsLeft={event.spotsLeft}
            />
          </div>
        )}

        {/* Description */}
        <p className="text-earth-600 mb-6">{event.description}</p>

        {/* Social Proof */}
        <div className="mb-6">
          <EventSocialProof
            eventId={event.id}
            recentRegistrations={recentRegistrations}
            testimonials={testimonials}
            currentViewers={event.currentViewers || 0}
          />
        </div>

        {/* Registration Button */}
        <button
          onClick={() => navigate(`/registration/${event.id}`)}
          className="w-full bg-sage-600 text-white py-3 px-6 rounded-lg hover:bg-sage-700 transition-colors text-center font-medium"
        >
          הרשמה לאירוע
        </button>
      </div>
    </motion.div>
  );
}