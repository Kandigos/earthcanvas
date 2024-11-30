import { Calendar, Clock, PiggyBank } from 'lucide-react';
import { Event } from '../types';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const isEarlyBird = event.earlyBirdEnds && new Date(event.earlyBirdEnds) > new Date();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden bg-gradient-to-br from-earth-100 via-earth-50 to-sage-100 p-4 sm:p-6 rounded-lg shadow-sm border border-earth-200/50 hover:shadow-md transition-all duration-300"
    >
      {/* Multiple layered gradient backgrounds for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-earth-200/30 via-transparent to-sage-200/30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-sage-100/20 via-transparent to-earth-100/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sage-200/20 via-earth-100/10 to-earth-200/20 rounded-full -mr-16 -mt-16 blur-sm" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-earth-200/20 via-sage-100/10 to-sage-200/20 rounded-full -ml-12 -mb-12 blur-sm" />

      {/* Early Bird Badge */}
      {isEarlyBird && event.earlyBirdPrice && (
        <div className="absolute top-4 right-4 bg-sage-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          מחיר מוזל
        </div>
      )}

      {/* Content */}
      <div className="relative">
        <h3 className="text-lg sm:text-xl font-semibold text-earth-800 mb-4 line-clamp-2">{event.title}</h3>
        <div className="text-earth-600 space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sage-600 flex-shrink-0" />
            <p className="text-sm sm:text-base">{event.date}</p>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-sage-600 flex-shrink-0" />
              <p className="text-sm sm:text-base">{event.time}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-sage-600 flex-shrink-0" />
            {isEarlyBird && event.earlyBirdPrice ? (
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-semibold">₪{event.earlyBirdPrice} <span className="text-sage-500 text-xs">(מחיר מוקדם)</span></p>
                <p className="text-xs text-earth-500 line-through">₪{event.price}</p>
              </div>
            ) : (
              <p className="text-sm sm:text-base font-semibold">₪{event.price}</p>
            )}
          </div>
        </div>

        <p className="text-earth-700 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">{event.description}</p>

        {/* Spots Left Indicator */}
        {event.spotsLeft !== undefined && event.spotsLeft < 10 && (
          <p className="text-sage-600 text-sm font-medium mb-4">
            נותרו {event.spotsLeft} מקומות בלבד!
          </p>
        )}

        {event.paymentLink && (
          <Button
            variant="primary"
            fullWidth
            size="lg"
            icon={<Calendar className="w-5 h-5" />}
            onClick={() => window.location.href = `/registration.html?eventId=${event.id}`}
            className="mt-auto"
          >
            הרשמה לאירוע
          </Button>
        )}
      </div>
    </motion.div>
  );
}