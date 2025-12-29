import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-ice-cyan animate-snowfall select-none"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size * 3}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            textShadow: `0 0 ${flake.size * 2}px hsl(var(--ice-cyan) / 0.6)`,
          }}
        >
          {['❄', '❅', '❆'][flake.id % 3]}
        </div>
      ))}
    </div>
  );
};
