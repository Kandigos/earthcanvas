import { useState, useEffect } from 'react';
import { User, Star } from 'lucide-react';
import { Testimonial } from '../types';

interface EventSocialProofProps {
  eventId: string;
  recentRegistrations: {
    name: string;
    timeAgo: string;
  }[];
  testimonials: Testimonial[];
  currentViewers: number;
}

export function EventSocialProof({
  eventId,
  recentRegistrations,
  testimonials,
  currentViewers
}: EventSocialProofProps) {
  const [latestRegistration, setLatestRegistration] = useState('');

  // Update latest registration time
  useEffect(() => {
    if (recentRegistrations.length > 0) {
      setLatestRegistration(recentRegistrations[0].timeAgo);
    }
  }, [recentRegistrations]);

  return (
    <div className="space-y-6">
      {/* Current Activity */}
      <div className="bg-sage-50 rounded-lg p-4 space-y-3 border border-sage-200">
        {currentViewers > 1 && (
          <p className="flex items-center gap-2 text-earth-700">
            <User className="w-4 h-4 text-sage-600" />
            <span>{currentViewers} אנשים צופים באירוע זה כעת</span>
          </p>
        )}
        
        {latestRegistration && (
          <p className="text-sm text-earth-600">
            ההרשמה האחרונה הייתה לפני {latestRegistration}
          </p>
        )}
      </div>

      {/* Recent Registrations */}
      {recentRegistrations.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-earth-100">
          <h3 className="font-medium text-earth-800 mb-3">נרשמו לאחרונה:</h3>
          <div className="space-y-2">
            {recentRegistrations.map((reg, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-sage-600" />
                </div>
                <div className="flex-1">
                  <p className="text-earth-800">{reg.name}</p>
                  <p className="text-sm text-earth-500">לפני {reg.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-earth-800">מה אומרים המשתתפים:</h3>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-4 shadow-sm border border-earth-100">
              <div className="flex items-start gap-3 mb-2">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-sage-600" />
                  </div>
                )}
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