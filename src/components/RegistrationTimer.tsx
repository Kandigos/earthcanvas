import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface RegistrationTimerProps {
  minutes: number;
  onExpire: () => void;
}

export function RegistrationTimer({ minutes, onExpire }: RegistrationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    // Set warning state when less than 2 minutes remain
    if (timeLeft <= 120 && !isWarning) {
      setIsWarning(true);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire, isWarning]);

  const minutes_ = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`flex items-center gap-2 p-4 rounded-lg ${isWarning ? 'bg-rose-50 text-rose-700' : 'bg-sage-50 text-earth-700'} mb-6`}>
      <Clock className={`w-5 h-5 ${isWarning ? 'text-rose-500' : 'text-sage-600'}`} />
      <div>
        <p className="font-medium">המקום שמור לך ל:</p>
        <p className="text-lg font-bold">
          {String(minutes_).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        {isWarning && (
          <p className="text-sm text-rose-600 mt-1">המיקום ישתחרר בקרוב!</p>
        )}
      </div>
    </div>
  );
}