import { useMemo } from "react";

const DustParticles = ({ count = 28 }: { count?: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 4;
        return {
          id: i,
          left: Math.random() * 100,
          size,
          delay: Math.random() * 12,
          duration: 14 + Math.random() * 18,
          dx: (Math.random() - 0.5) * 120,
          opacity: 0.3 + Math.random() * 0.5,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="dust"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-dust ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error css var
            "--dx": `${p.dx}px`,
          }}
        />
      ))}
    </div>
  );
};

export default DustParticles;