import { useState, useEffect } from 'react';
import { Clock, Users } from 'lucide-react';

interface EventPricingInfoProps {
  eventDate: string;
  originalPrice: number;
  earlyBirdPrice: number;
  totalSpots: number;
  spotsLeft: number;
}

export function EventPricingInfo({
  eventDate,
  originalPrice,
  earlyBirdPrice,
  totalSpots,
  spotsLeft
}: EventPricingInfoProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [spotsFilled, setSpotsFilled] = useState(0);

  // Calculate time remaining until event
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(eventDate) - +new Date();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);

        setTimeLeft(`${days} ימים ${hours} שעות ${minutes} דקות`);
      } else {
        setTimeLeft('האירוע התחיל');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [eventDate]);

  // Calculate spots filled percentage
  useEffect(() => {
    const filledPercentage = ((totalSpots - spotsLeft) / totalSpots) * 100;
    setSpotsFilled(Math.round(filledPercentage));
  }, [totalSpots, spotsLeft]);

  const savings = originalPrice - earlyBirdPrice;

  return (
    <div className="bg-sage-50 rounded-lg p-4 space-y-4 border border-sage-200">
      {/* Early Bird Timer */}
      <div className="flex items-center gap-2 text-earth-800">
        <Clock className="w-5 h-5 text-sage-600" />
        <div>
          <p className="font-semibold">מחיר מוקדמות מסתיים בעוד:</p>
          <p className="text-lg">{timeLeft}</p>
        </div>
      </div>

      {/* Price Information */}
      <div className="bg-white rounded p-3 text-center">
        <p className="text-sm text-earth-600 line-through">₪{originalPrice}</p>
        <p className="text-2xl font-bold text-earth-800">₪{earlyBirdPrice}</p>
        <p className="text-sage-600 font-medium">חסכון של ₪{savings}</p>
      </div>

      {/* Spots Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-earth-600">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {spotsLeft} מקומות נותרו
          </span>
          <span>{spotsFilled}% מלא</span>
        </div>
        <div className="h-2 bg-sage-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sage-600 rounded-full transition-all duration-500"
            style={{ width: `${spotsFilled}%` }}
          />
        </div>
      </div>

      {/* FOMO Trigger */}
      {spotsLeft < 10 && (
        <p className="text-rose-600 text-sm font-medium text-center">
          ⚠️ נותרו {spotsLeft} מקומות בלבד במחיר זה
        </p>
      )}
    </div>
  );
}