import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const retreatDate = new Date('July 12, 2025 00:00:00').getTime();
      const now = new Date().getTime();
      const difference = retreatDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div 
      className="bg-gradient-to-r from-background via-primary/10 to-background rounded-lg p-8 my-12 text-center max-w-4xl mx-auto"
    >
      <h3 className="text-primary text-2xl mb-6 uppercase tracking-wide font-bold">
        Retreat Countdown
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map(({ label, value }) => (
          <div 
            key={label}
            className="bg-background/70 border-2 border-primary rounded-lg p-4 min-w-[120px]"
            style={{ boxShadow: '0 0 15px hsl(var(--primary) / 0.3)' }}
          >
            <span className="text-3xl md:text-4xl font-bold text-primary block mb-2">
              {formatNumber(value)}
            </span>
            <span className="text-sm uppercase tracking-wide text-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;