import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { AnimatedCard } from './AnimatedCard';

const testimonials = [
  {
    name: "רונית לוי",
    text: "המרחב הזה הוא פנינה אמיתית. הסדנאות והאירועים תמיד מעוררי השראה ומחברים אותי מחדש לטבע ולעצמי.",
    role: "אמנית ומשתתפת קבועה"
  },
  {
    name: "דני כהן",
    text: "מצאתי כאן קהילה תומכת ומקום שמאפשר לי להתחבר לאמנות ולטבע בדרך ייחודית ומעצימה.",
    role: "חבר קהילה"
  },
  {
    name: "מיכל ברק",
    text: "הצוות מקסים והאווירה מדהימה. כל ביקור במרחב משאיר אותי עם תחושת התחדשות והשראה.",
    role: "מנחת סדנאות אורחת"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-earth-100 to-sage-100">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-earth-800 mb-4">מה אומרים עלינו</h2>
          <p className="text-xl text-earth-600 max-w-2xl mx-auto">
            החוויות של המבקרים והמשתתפים שלנו
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-earth-700 mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="mt-auto">
                  <h4 className="font-semibold text-earth-800">{testimonial.name}</h4>
                  <p className="text-earth-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}