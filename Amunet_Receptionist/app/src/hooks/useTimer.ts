import { useState, useEffect } from 'react';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export const useTimer = (expiryKey: string, hours: number = 72): TimeRemaining => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const storedExpiry = localStorage.getItem(expiryKey);
    let expiryDate: Date;

    if (storedExpiry) {
      expiryDate = new Date(storedExpiry);
    } else {
      expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + hours);
      localStorage.setItem(expiryKey, expiryDate.toISOString());
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = expiryDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, expired: true });
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining({ hours: h, minutes: m, seconds: s, expired: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryKey, hours]);

  return timeRemaining;
};