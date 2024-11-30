import { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useAuth } from '../hooks/useAuth';
import { Event } from '../types';
import { Trash2, LogOut, Loader, Plus, Eye, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthModal } from '../components/AuthModal';
import { PreviewModal } from '../components/PreviewModal';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/Container';
import { Button } from '../components/Button';

type NewEventForm = Omit<Event, 'id'>;

const defaultNewEvent: Partial<NewEventForm> = {
  title: '',
  date: '',
  time: '',
  price: 0,
  description: '',
  paymentLink: '',
  capacity: undefined
};

export function AdminPage() {
  const { events, loading, addEvent, deleteEvent } = useEvents();
  const { isAuthenticated, login, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState<Partial<NewEventForm>>(defaultNewEvent);

  const handleLogin = (password: string) => {
    const success = login(password);
    if (success) {
      setShowAuthModal(false);
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast.error('נא למלא את כל השדות הנדרשים');
      return;
    }

    // Filter out undefined values for optional fields
    const eventData = Object.fromEntries(
      Object.entries(newEvent).filter(([_, value]) => value !== undefined)
    ) as NewEventForm;

    const success = await addEvent(eventData);
    if (success) {
      toast.success('האירוע נוסף בהצלחה');
      setNewEvent(defaultNewEvent);
    } else {
      toast.error('אירעה שגיאה בהוספת האירוע');
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteEvent(id);
    if (success) {
      toast.success('האירוע נמחק בהצלחה');
    } else {
      toast.error('אירעה שגיאה במחיקת האירוע');
    }
  };

  if (!isAuthenticated || showAuthModal) {
    return <AuthModal onClose={() => navigate('/')} onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-nature-green" />
      </div>
    );
  }

  return (
    <Container size="md" className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-nature-charcoal">ניהול אירועים</h1>
        <Button
          variant="outline"
          size="sm"
          icon={<LogOut className="w-5 h-5" />}
          onClick={handleLogout}
        >
          יציאה
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-nature-charcoal mb-2">כותרת</label>
            <input
              type="text"
              value={newEvent.title || ''}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-nature-green focus:border-nature-green outline-none"
              placeholder="שם האירוע"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nature-charcoal mb-2">תאריך</label>
            <input
              type="date"
              value={newEvent.date || ''}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-nature-green focus:border-nature-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nature-charcoal mb-2">שעה</label>
            <input
              type="time"
              value={newEvent.time || ''}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-nature-green focus:border-nature-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nature-charcoal mb-2">מחיר</label>
            <input
              type="number"
              value={newEvent.price || 0}
              onChange={(e) => setNewEvent({ ...newEvent, price: Number(e.target.value) })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-nature-green focus:border-nature-green outline-none"
              placeholder="מחיר בש״ח"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nature-charcoal mb-2">מספר משתתפים</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={newEvent.capacity || ''}
                onChange={(e) => setNewEvent({ ...newEvent, capacity: Number(e.target.value) })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-nature-green focus:border-nature-green outline-none"
                placeholder="מספר משתתפים מקסימלי"
                min="0"
              />
              <Users className="w-5 h-5 text-nature-charcoal/60" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-nature-charcoal mb-2">קישור לתשלום</label>
            <input
              type="url"
              value={newEvent.paymentLink || ''}
              onChange={(e) => setNewEvent({ ...newEvent, paymentLink: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-nature-green focus:border-nature-green outline-none"
              placeholder="קישור לדף התשלום"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-nature-charcoal mb-2">תיאור</label>
            <textarea
              value={newEvent.description || ''}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-nature-green focus:border-nature-green outline-none"
              rows={4}
              placeholder="תיאור האירוע"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            icon={<Plus className="w-5 h-5" />}
          >
            הוסף אירוע
          </Button>
          <Button
            type="button"
            variant="secondary"
            icon={<Eye className="w-5 h-5" />}
            onClick={() => setShowPreviewModal(true)}
          >
            תצוגה מקדימה
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-nature-charcoal">אירועים קיימים</h2>
        <div className="grid gap-4">
          {events.length === 0 ? (
            <p className="text-center text-nature-charcoal/60 py-8">אין אירועים להצגה</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition-all">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                  <p className="text-sm text-nature-charcoal/60">{event.date} | {event.time}</p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  icon={<Trash2 className="w-5 h-5" />}
                  onClick={() => handleDelete(event.id)}
                >
                  מחק
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {showPreviewModal && (
        <PreviewModal 
          event={newEvent}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </Container>
  );
}