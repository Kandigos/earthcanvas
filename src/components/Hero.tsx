import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackgroundCanvas } from './FallingLeaves';

export function Hero() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* רקע אנימטיבי */}
      <BackgroundCanvas />

      {/* רקע תמונה */}
      <div className="absolute inset-0 z-10">
        <img
          src="/myneeed_Eine_detaillierte_Querschnittsansicht_der_Erde_die_zeig_0458f04a-c571-41fb-ad3f-8638052b4ef2.png"
          alt="חתך כדור הארץ"
          className="object-cover w-full h-full"
          style={{
            filter: 'brightness(1.6) contrast(0.9)',
          }}
        />
      </div>

      {/* שכבות אפקט */}
      <div 
        className="absolute inset-0 z-20" 
        style={{
          background: `
            linear-gradient(to bottom, 
              rgba(0,0,0,0.4) 0%, 
              rgba(0,0,0,0.5) 50%,
              rgba(0,0,0,0.6) 100%
            ),
            radial-gradient(
              circle at center,
              transparent 0%,
              rgba(0,0,0,0.3) 100%
            )
          `,
          backdropFilter: 'blur(1px)',
        }}
      />

      {/* תוכן */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-7xl font-bold mb-6 text-white tracking-wide">
            מרחב אבא אדמה
          </h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6 rounded-full" />
          <p className="text-2xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed">
            מקום של טבע, אמנות וקהילה
            <br />
            הצטרפו אלינו לחוויה צמחית ומעשירה
          </p>
        </motion.div>

        <motion.div 
          className="flex gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link to="/events">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all text-lg font-medium shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-6 h-6" />
              צפו באירועים שלנו
            </motion.button>
          </Link>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToFeatures}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl flex items-center gap-3 backdrop-blur-sm transition-all text-lg font-medium border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl"
          >
            גלו עוד
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="w-1 h-16 rounded-full bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </div>
  );
}