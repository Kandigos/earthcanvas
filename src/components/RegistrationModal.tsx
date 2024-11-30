import { X } from 'lucide-react';
import { RegistrationForm } from './RegistrationForm';
import { Event } from '../types';
import { motion } from 'framer-motion';

interface RegistrationModalProps {
  event: Event;
  onClose: () => void;
}

export function RegistrationModal({ event, onClose }: RegistrationModalProps) {
  const handleSuccess = () => {
    if (event.paymentLink) {
      if (event.paymentLink.startsWith('http')) {
        window.location.href = event.paymentLink;
      } else {
        window.location.href = `${window.location.origin}${event.paymentLink}`;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-earth-600 hover:text-earth-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-earth-800 mb-2">הרשמה ל{event.title}</h2>
          <p className="text-earth-600">אנא מלאו את הפרטים הבאים:</p>
        </div>

        <RegistrationForm
          event={event}
          onSuccess={handleSuccess}
          onCancel={onClose}
        />

        {event.spotsLeft !== undefined && event.spotsLeft < 10 && (
          <p className="mt-4 text-sm text-red-600 text-center">
            נותרו {event.spotsLeft} מקומות בלבד!
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}