import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Event } from '../types';
import { EventCard } from './EventCard';
import { AnimatedCard } from './AnimatedCard';
import { Container } from './Container';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-r from-earth-400/10 to-sage-400/10">
        <Container size="md">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                transition: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            >
              <Calendar className="w-16 h-16 mx-auto text-earth-400 mb-4" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-earth-600 mb-2">אין אירועים קרובים</h2>
            <p className="text-earth-500">אנחנו עובדים על הוספת אירועים חדשים. אנא בדקו שוב בקרוב.</p>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-earth-400/10 to-sage-400/10">
      <Container>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-earth-800 mb-10 text-center"
        >
          אירועים קרובים
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <AnimatedCard key={event.id} delay={index * 0.1}>
              <EventCard event={event} />
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}