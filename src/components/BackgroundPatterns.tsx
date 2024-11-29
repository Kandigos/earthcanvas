import { motion, useScroll, useTransform } from 'framer-motion';

interface PatternProps {
  className?: string;
}

export function SophisticatedPattern({ className = "" }: PatternProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  
  return (
    <motion.div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ y, scale, rotate }}
    >
      <div className="absolute inset-0 bg-[url('/patterns/sophisticated-nature.svg')] bg-repeat bg-[length:400px_400px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nature-green/5 to-nature-cream/20" />
    </motion.div>
  );
}

export function LeafPattern({ className = "" }: PatternProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  return (
    <motion.div 
      className={`absolute inset-0 opacity-[0.07] pointer-events-none ${className}`}
      style={{ y }}
    >
      <div className="absolute inset-0 bg-[url('/patterns/leaves.svg')] bg-repeat bg-[length:48px_48px] transform rotate-12" />
    </motion.div>
  );
}

export function WoodPattern({ className = "" }: PatternProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  return (
    <motion.div 
      className={`absolute inset-0 opacity-[0.08] pointer-events-none ${className}`}
      style={{ y }}
    >
      <div className="absolute inset-0 bg-[url('/patterns/wood.svg')] bg-repeat bg-[length:120px_120px]" />
    </motion.div>
  );
}

export function CirclesPattern({ className = "" }: PatternProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  
  return (
    <motion.div 
      className={`absolute inset-0 opacity-[0.06] pointer-events-none ${className}`}
      style={{ y }}
    >
      <div className="absolute inset-0 bg-[url('/patterns/circles.svg')] bg-repeat bg-[length:64px_64px]" />
    </motion.div>
  );
}