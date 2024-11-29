import { motion } from 'framer-motion';
import { Palette, Users, Heart, Leaf } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';
import { Container } from './Container';
import { WoodPattern } from './BackgroundPatterns';

const features = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: "סדנאות אמנות",
    description: "סדנאות יצירה מגוונות המשלבות חומרים טבעיים וטכניקות מסורתיות"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "מפגשי קהילה",
    description: "אירועים קהילתיים המחברים אנשים דרך אמנות, טבע ויצירה משותפת"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "מרחב מרפא",
    description: "סביבה תומכת המאפשרת ריפוי והתחדשות דרך חיבור לאדמה ולטבע"
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "חיבור לטבע",
    description: "פעילויות המעודדות קשר עמוק עם הטבע והסביבה"
  }
];

export function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24 bg-nature-gradient-soft overflow-hidden">
      <WoodPattern />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 relative z-10 px-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-nature-forest mb-4">המרחב שלנו</h2>
          <p className="text-lg sm:text-xl text-nature-charcoal/80 max-w-2xl mx-auto">
            מגוון פעילויות וחוויות המחברות בין אדם, אמנות וטבע
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10 px-4">
          {features.map((feature, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="text-nature-green mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-nature-forest mb-4">
                  {feature.title}
                </h3>
                <p className="text-nature-charcoal/80">
                  {feature.description}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}