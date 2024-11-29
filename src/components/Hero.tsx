import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export function Hero() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      const yOffset = -80;
      const y = featuresSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] sm:min-h-[70vh] px-2 sm:px-4 flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.7)'
          }}
        >
          <source src="/aba_adama_prob4.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="max-w-7xl mx-auto text-center relative z-20 py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
        {/* Text Container with Backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-block px-3 sm:px-8 py-4 sm:py-6 rounded-2xl w-full sm:w-auto"
        >
          {/* Backdrop blur and gradient */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl" />
          
          {/* Content */}
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-nature-cream mb-4 sm:mb-6 leading-tight text-shadow-lg">
              מרחב אבא אדמה
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-nature-cream mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-shadow-md px-2 sm:px-4"
            >
              מקום של טבע, אמנות וקהילה. הצטרפו אלינו לחוויה יצירתית ומעשירה.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-4"
            >
              <Link to="/events" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  icon={<Calendar className="w-5 h-5" />}
                  fullWidth
                >
                  צפו באירועים שלנו
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={scrollToFeatures}
                className="bg-nature-cream/10 backdrop-blur-sm hover:bg-nature-cream/20 w-full sm:w-auto"
              >
                למידע נוסף
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nature-forest/60 via-nature-forest/30 to-transparent pointer-events-none z-10" />
    </div>
  );
}