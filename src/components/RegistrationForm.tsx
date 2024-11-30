import { useState } from 'react';
import { sendRegistrationToWebhook } from '../lib/webhook';
import { Event } from '../types';
import toast from 'react-hot-toast';

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
    participants: 1,
    eventDate: '',
    specialRequests: '',
    paymentStatus: 'pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (data: typeof formData) => {
    if (!data.phone.match(/^[0-9]{10}$/)) {
      throw new Error('מספר טלפון לא תקין');
    }
    if (data.participants < 1) {
      throw new Error('מספר משתתפים לא תקין');
    }
    if (!data.eventDate) {
      throw new Error('נא לבחור תאריך');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      validateForm(formData);

      const registrationData = {
        eventId: event.id,
        eventTitle: event.title,
        ...formData,
        registrationDate: new Date().toISOString(),
      };

      const success = await sendRegistrationToWebhook(registrationData);

      if (success) {
        toast.success('ההרשמה בוצעה בהצלחה!');
        onSuccess?.();
      } else {
        toast.error('אירעה שגיאה בהרשמה. אנא נסו שנית.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('אירעה שגיאה בהרשמה. אנא נסו שנית.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">שם מלא</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          dir="rtl"
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
          dir="ltr"
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
          dir="ltr"
          placeholder="0501234567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">מספר משתתפים</label>
        <input
          type="number"
          required
          min="1"
          value={formData.participants}
          onChange={(e) => setFormData(prev => ({ ...prev, participants: parseInt(e.target.value) }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">תאריך</label>
        <input
          type="date"
          required
          value={formData.eventDate}
          onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">בקשות מיוחדות</label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          rows={3}
          dir="rtl"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-sage-600 text-white py-3 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'שולח...' : 'הרשמה לאירוע'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-earth-100 text-earth-800 py-3 rounded-lg hover:bg-earth-200 transition-colors"
          >
            ביטול
          </button>
        )}
      </div>
    </form>
  );
}