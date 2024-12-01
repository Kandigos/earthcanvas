import { Calendar, Clock, PiggyBank } from 'lucide-react';
import { Event } from '../types';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate(`/registration/${event.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden bg-gradient-to-br from-earth-100 via-earth-50 to-sage-100 p-4 sm:p-6 rounded-lg shadow-sm border border-earth-200/50 hover:shadow-md transition-all duration-300"
    >
      <div className="relative">
        <h3 className="text-lg sm:text-xl font-semibold text-earth-800 mb-4 line-clamp-2">{event.title}</h3>
        <div className="text-earth-600 space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sage-600 flex-shrink-0" />
            <p className="text-sm sm:text-base">{event.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sage-600 flex-shrink-0" />
            <p className="text-sm sm:text-base">{event.time}</p>
          </div>
          <div className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-sage-600 flex-shrink-0" />
            <p className="text-sm sm:text-base font-semibold">₪{event.price}</p>
          </div>
        </div>
        {event.description && (
          <p className="text-earth-700 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
            {event.description}
          </p>
        )}
        
        <Button
          variant="primary"
          fullWidth
          size="lg"
          icon={<Calendar className="w-5 h-5" />}
          onClick={handleRegistration}
          className="mt-auto"
        >
          הרשמה לאירוע
        </Button>
      </div>
    </motion.div>
  );
}