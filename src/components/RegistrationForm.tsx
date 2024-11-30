import { useState } from 'react';
import { sendRegistrationToWebhook } from '../lib/webhook';
import { Event } from '../types';
import { ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from './Button';

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const registrationData = {
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
        setIsSubmitted(true);
      } else {
        toast.error(result.error || 'אירעה שגיאה בהרשמה. אנא נסו שנית.');
      }
    } catch (error) {
      toast.error('אירעה שגיאה בהרשמה. אנא נסו שנית.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message and payment button after submission
  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-earth-800 mb-3">ההרשמה הושלמה בהצלחה!</h3>
          <p className="text-earth-600 mb-6">פרטי ההרשמה נשלחו למייל {formData.email}</p>
          
          {event.paymentLink && (
            <div className="space-y-4">
              <p className="text-earth-700 font-medium">כעת נותר רק להשלים את התשלום כדי להבטיח את מקומך באירוע</p>
              <Button
                variant="primary"
                fullWidth
                size="lg"
                icon={<ExternalLink className="w-5 h-5" />}
                onClick={() => window.open(event.paymentLink, '_blank')}
              >
                מעבר לתשלום
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

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
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
          loading={isSubmitting}
        >
          {isSubmitting ? 'שולח...' : 'הרשמה לאירוע'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
            fullWidth
          >
            ביטול
          </Button>
        )}
      </div>
    </form>
  );
}