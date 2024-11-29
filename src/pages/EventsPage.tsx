import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Palette } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { Container } from '../components/Container';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EventCard } from '../components/EventCard';
import { AnimatedCard } from '../components/AnimatedCard';

export function EventsPage() {
  const { category } = useParams();
  const { events, loading } = useEvents();

  const filteredEvents = events.filter(event => {
    if (!category || category === 'all') return true;
    if (category === 'workshops') return event.title.includes('סדנה');
    if (category === 'community') return event.title.includes('מפגש');
    return true;
  });

  const categoryInfo = {
    workshops: {
      title: 'סדנאות',
      description: 'הצטרפו לסדנאות האמנות והיצירה שלנו',
      icon: <Palette className="w-12 h-12 text-nature-green" />
    },
    community: {
      title: 'מפגשי קהילה',
      description: 'אירועים קהילתיים מיוחדים',
      icon: <Users className="w-12 h-12 text-nature-green" />
    },
    all: {
      title: 'כל האירועים',
      description: 'כל האירועים והפעילויות שלנו',
      icon: <Calendar className="w-12 h-12 text-nature-green" />
    }
  };

  const currentCategory = (category as keyof typeof categoryInfo) || 'all';

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-nature-gradient-soft py-16">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            {categoryInfo[currentCategory].icon}
          </div>
          <h1 className="text-3xl font-bold text-nature-forest mb-3">
            {categoryInfo[currentCategory].title}
          </h1>
          <p className="text-lg text-nature-charcoal/80 max-w-2xl mx-auto">
            {categoryInfo[currentCategory].description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-nature-charcoal/80">אין אירועים להצגה כרגע</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <AnimatedCard key={event.id} delay={index * 0.1}>
                <EventCard event={event} />
              </AnimatedCard>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}