import { User, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
}

interface EventSocialProofProps {
  eventId: string;
  testimonials: Testimonial[];
  currentViewers?: number;
}

export function EventSocialProof({ 
  testimonials,
  currentViewers = 0 
}: EventSocialProofProps) {
  return (
    <div className="space-y-6">
      {currentViewers > 1 && (
        <div className="bg-sage-50 rounded-lg p-4 space-y-3 border border-sage-200">
          <p className="flex items-center gap-2 text-earth-700">
            <User className="w-4 h-4 text-sage-600" />
            <span>{currentViewers} אנשים צופים באירוע זה כעת</span>
          </p>
        </div>
      )}

      {testimonials.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-earth-800">מה אומרים המשתתפים:</h3>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-4 shadow-sm border border-earth-100">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-sage-600" />
                </div>
                <div>
                  <p className="font-medium text-earth-800">{testimonial.name}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-earth-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-earth-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}