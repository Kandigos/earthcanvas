import { useState } from 'react';
import { sendRegistrationToWebhook } from '../lib/webhook';
import { Event } from '../types';
import { Button } from './Button';
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
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const registrationData = {
        eventId: event.id,
        eventTitle: event.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        participants: formData.participants,
        specialRequests: formData.specialRequests,
        registrationDate: new Date().toISOString(),
      };

      await sendRegistrationToWebhook(registrationData);
      toast.success('ההרשמה בוצעה בהצלחה!');
      onSuccess?.();

    } catch (error) {
      console.error('Registration error:', error);
      toast.error(
        error instanceof Error 
          ? `שגיאה בהרשמה: ${error.message}` 
          : 'אירעה שגיאה בהרשמה. אנא נסו שנית.'
      );
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
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-earth-800 mb-2">מספר משתתפים</label>
        <input
          type="number"
          required
          min="1"
          max={event.maxParticipants || 10}
          value={formData.participants}
          onChange={(e) => setFormData(prev => ({ ...prev, participants: parseInt(e.target.value) }))}
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
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'שולח...' : 'המשך להרשמה'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={onCancel}
            disabled={isSubmitting}
          >
            ביטול
          </Button>
        )}
      </div>
    </form>
  );
}