'use client';
import { useState, useEffect } from 'react';

type CountdownProps = {
  targetDate: string;
};

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };
    
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-flow-col gap-3 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral-600/20 rounded-lg text-white">
        <span className="font-mono text-3xl font-bold">
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-xs">days</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral-600/20 rounded-lg text-white">
        <span className="font-mono text-3xl font-bold">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-xs">hours</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral-600/20 rounded-lg text-white">
        <span className="font-mono text-3xl font-bold">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-xs">min</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral-600/20 rounded-lg text-white">
        <span className="font-mono text-3xl font-bold">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-xs">sec</span>
      </div>
    </div>
  );
}
