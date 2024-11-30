import { Calendar, Clock, PiggyBank, Star } from 'lucide-react';
import { useState } from 'react';
import { Event, EventCardProps } from '../types';
import { Button } from './Button';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import toast from 'react-hot-toast';

export function EventCard({ event, testimonials }: EventCardProps) {
  const [isEarlyBird, setIsEarlyBird] = useState(
    event.earlyBirdEnds && new Date(event.earlyBirdEnds) > new Date()
  );

  const handleTimerExpire = () => {
    setIsEarlyBird(false);
    toast('המחיר המוזל הסתיים!', {
      icon: '⏰',
      duration: 5000,
    });
  };

  const handleRegistration = () => {
    if (event.paymentLink) {
      // אם זה URL מלא, נשתמש בו ישירות
      if (event.paymentLink.startsWith('http')) {
        window.location.href = event.paymentLink;
      } else {
        window.location.href = `${window.location.origin}${event.paymentLink}`;
      }
    }
  };

  const averageRating = testimonials?.length
    ? testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length
    : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden bg-gradient-to-br from-earth-100 via-earth-50 to-sage-100 p-4 sm:p-6 rounded-lg shadow-sm border border-earth-200/50 hover:shadow-md transition-all duration-300"
    >
      {/* Early Bird Timer */}
      {isEarlyBird && event.earlyBirdPrice && event.earlyBirdEnds && (
        <CountdownTimer
          endDate={event.earlyBirdEnds}
          onExpire={handleTimerExpire}
          className="mb-4"
        />
      )}

      {/* Content */}
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-earth-800 line-clamp-2">{event.title}</h3>
          {averageRating > 0 && (
            <div className="flex items-center gap-1 text-sage-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>

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
                <p className="text-sm sm:text-base font-semibold">
                  ₪{event.earlyBirdPrice} 
                  <motion.span 
                    className="text-sage-500 text-xs bg-sage-100 px-2 py-1 rounded-full ml-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    מחיר מוקדם
                  </motion.span>
                </p>
                <p className="text-xs text-earth-500 line-through">₪{event.price}</p>
              </div>
            ) : (
              <p className="text-sm sm:text-base font-semibold">₪{event.price}</p>
            )}
          </div>
        </div>

        <p className="text-earth-700 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">{event.description}</p>

        {/* Social Proof */}
        {testimonials?.length && (
          <div className="mb-4 text-sm text-earth-600">
            <p>{testimonials.length} משתתפים הוסיפו חוות דעת</p>
          </div>
        )}

        {/* Spots Left Indicator */}
        {event.spotsLeft !== undefined && event.spotsLeft < 10 && (
          <motion.p 
            className="text-sage-600 text-sm font-medium mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            נותרו {event.spotsLeft} מקומות בלבד!
          </motion.p>
        )}

        {event.paymentLink && (
          <Button
            variant="primary"
            fullWidth
            size="lg"
            icon={<Calendar className="w-5 h-5" />}
            onClick={handleRegistration}
            className="mt-auto"
          >
            {isEarlyBird ? 'הבטיחו מחיר מוזל' : 'הרשמה לאירוע'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}