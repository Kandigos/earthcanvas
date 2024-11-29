import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { EventList } from '../components/EventList';
import { Testimonials } from '../components/Testimonials';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useEvents } from '../hooks/useEvents';

export function HomePage() {
  const { events, loading } = useEvents();

  return (
    <div className="bg-gradient-to-b from-transparent via-nature-cream to-nature-beige">
      <Hero />
      <Features />
      {loading ? <LoadingSpinner /> : <EventList events={events} />}
      <Testimonials />
      {/* Bottom gradient overlay */}
      <div className="h-24 bg-gradient-to-t from-nature-forest/10 to-transparent" />
    </div>
  );
}