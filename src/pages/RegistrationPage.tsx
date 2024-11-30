import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../components/Container';
import { RegistrationForm } from '../components/RegistrationForm';
import { useEvents } from '../hooks/useEvents';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function RegistrationPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, loading } = useEvents();

  if (loading) {
    return <LoadingSpinner />;
  }

  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <Container>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-earth-800 mb-4">האירוע לא נמצא</h2>
          <p className="text-earth-600 mb-6">לא מצאנו את האירוע המבוקש</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-sage-600 text-white px-6 py-2 rounded-lg hover:bg-sage-700 transition-colors"
          >
            חזרה לאירועים
          </button>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-nature-gradient-soft py-16">
      <Container size="sm">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-earth-200/50">
          <h2 className="text-2xl font-bold text-earth-800 mb-2">הרשמה לאירוע</h2>
          <h3 className="text-xl text-earth-600 mb-6">{event.title}</h3>
          
          <div className="mb-6 space-y-2 text-earth-700">
            <p><strong>תאריך:</strong> {event.date}</p>
            <p><strong>שעה:</strong> {event.time}</p>
            <p><strong>מחיר:</strong> ₪{event.price}</p>
          </div>

          <RegistrationForm 
            event={event}
            onSuccess={() => navigate('/events')}
            onCancel={() => navigate('/events')}
          />
        </div>
      </Container>
    </div>
  );
}