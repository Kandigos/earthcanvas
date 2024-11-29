import { motion } from 'framer-motion';
import { ArrowDownCircle, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { SophisticatedPattern } from './BackgroundPatterns';

export function Hero() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[90vh] sm:min-h-[80vh] px-4 flex items-center overflow-hidden bg-nature-gradient">
      {/* Sophisticated Background Pattern */}
      <SophisticatedPattern />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-nature-green/20 to-nature-forest/20"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {/* Text Container with Backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-block px-4 sm:px-8 py-6 rounded-2xl w-full sm:w-auto"
        >
          {/* Backdrop blur and gradient */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl" />
          
          {/* Content */}
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-nature-cream mb-6 leading-tight text-shadow-lg">
              מרחב אבא אדמה
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl text-nature-cream mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed text-shadow-md px-4"
            >
              מקום של טבע, אמנות וקהילה. הצטרפו אלינו לחוויה יצירתית ומעשירה.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
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
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hidden sm:block"
          onClick={scrollToFeatures}
        >
          <ArrowDownCircle className="w-12 h-12 text-nature-cream opacity-70 hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
      
      {/* Enhanced bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nature-forest/60 via-nature-forest/30 to-transparent pointer-events-none" />
    </div>
  );
}