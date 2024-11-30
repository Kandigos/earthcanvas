import { useState } from 'react';
import { sendRegistrationToWebhook, RegistrationData } from '../lib/webhook';
import { Event } from '../types';
import toast from 'react-hot-toast';
import { AlertCircle } from 'lucide-react';

interface RegistrationFormProps {
  event: Event;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RegistrationForm({ event, onSuccess, onCancel }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const registrationData: RegistrationData = {
        eventId: event.id,
        eventTitle: event.title,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        notes: formData.notes.trim(),
        registrationDate: new Date().toISOString(),
        eventDate: event.date,
        eventTime: event.time,
        eventPrice: event.price
      };

      const result = await sendRegistrationToWebhook(registrationData);

      if (result.success) {
        toast.success('ההרשמה בוצעה בהצלחה!');
        onSuccess?.();
      } else {
        setError(result.error || 'אירעה שגיאה בהרשמה. אנא נסו שנית.');
        toast.error(result.error || 'אירעה שגיאה בהרשמה. אנא נסו שנית.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'אירעה שגיאה בהרשמה. אנא נסו שנית.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">שם מלא</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          placeholder="הכנס שם מלא"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">אימייל</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">טלפון</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          placeholder="הכנס מספר טלפון"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">הערות</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 min-h-[100px]"
          placeholder="הערות נוספות (לא חובה)"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-sage-600 text-white py-3 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'שולח...' : 'הרשמה לאירוע'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-earth-100 text-earth-800 py-3 rounded-lg hover:bg-earth-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ביטול
          </button>
        )}
      </div>
    </form>
  );
}