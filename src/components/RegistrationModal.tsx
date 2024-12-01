import { useState } from 'react';
import { X } from 'lucide-react';
import { Event } from '../types';
import { RegistrationTimer } from './RegistrationTimer';
import { Button } from './Button';
import toast from 'react-hot-toast';

interface RegistrationModalProps {
  event: Event;
  onClose: () => void;
  onSubmit: (data: RegistrationData) => Promise<boolean>;
}

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export function RegistrationModal({ event, onClose, onSubmit }: RegistrationModalProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await onSubmit(formData);
      if (success) {
        toast.success('ההרשמה בוצעה בהצלחה!');
        onClose();
      }
    } catch (error) {
      toast.error('אירעה שגיאה. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimerExpire = () => {
    toast.error('זמן ההרשמה הסתיים');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-earth-600 hover:text-earth-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-earth-800 mb-6">הרשמה ל{event.title}</h2>
          
          <RegistrationTimer minutes={15} onExpire={handleTimerExpire} />

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? 'שולח...' : 'הרשמה לאירוע'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                fullWidth
              >
                ביטול
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}