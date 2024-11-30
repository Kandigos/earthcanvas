import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../components/Container';
import { RegistrationForm } from '../components/RegistrationForm';
import { useEvents } from '../hooks/useEvents';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { Calendar, Clock, PiggyBank, ArrowRight } from 'lucide-react';

export function RegistrationPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <div className="min-h-screen bg-nature-gradient-soft py-16 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-nature-gradient-soft py-16">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h2 className="text-2xl font-bold text-earth-800 mb-4">האירוע לא נמצא</h2>
            <p className="text-earth-600 mb-6">לא מצאנו את האירוע המבוקש</p>
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-2 bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              חזרה לאירועים
            </button>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-gradient-soft py-16">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg overflow-hidden shadow-sm border border-earth-200/50"
        >
          {/* Header */}
          <div className="bg-sage-50 border-b border-earth-200/50 p-6">
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-2 text-earth-600 hover:text-earth-800 text-sm mb-4 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              חזרה לאירועים
            </button>
            <h2 className="text-2xl font-bold text-earth-800 mb-2">הרשמה לאירוע</h2>
            <h3 className="text-xl text-earth-600">{event.title}</h3>
          </div>
          
          {/* Event Details */}
          <div className="p-6 border-b border-earth-200/50 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-sage-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-earth-500">תאריך</p>
                  <p className="text-earth-800">{event.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-sage-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-earth-500">שעה</p>
                  <p className="text-earth-800">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <PiggyBank className="w-5 h-5 text-sage-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-earth-500">מחיר</p>
                  <p className="text-earth-800 font-semibold">₪{event.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="p-6">
            <RegistrationForm 
              event={event}
              onCancel={() => navigate('/events')}
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}