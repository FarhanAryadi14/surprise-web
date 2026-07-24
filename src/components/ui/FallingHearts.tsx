import React, { useMemo } from 'react';

// Komponen efek partikel hati yang jatuh secara kontinyu namun ringan (60 FPS di HP low-end)
export const FallingHearts: React.FC = () => {
  // Gunakan useMemo agar posisi acak partikel tidak di-recalculate saat re-render
  const hearts = useMemo(() => {
    const symbols = ['❤️', '💖', '🌸', '✨', '💕', '💗'];
    return Array.from({ length: 18 }).map((_, index) => ({
      id: index,
      symbol: symbols[index % symbols.length],
      left: `${Math.random() * 92 + 4}%`, // horizontal 4% hingga 96%
      duration: Math.random() * 6 + 6,     // durasi antara 6 - 12 detik
      delay: Math.random() * 7,            // delay acak awal
      size: Math.random() * 12 + 14,       // ukuran font 14px - 26px
      opacity: Math.random() * 0.4 + 0.3,  // opacity halus 0.3 - 0.7
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute -top-10 select-none animate-falling"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `fallingHeart ${heart.duration}s linear ${heart.delay}s infinite`,
            willChange: 'transform, opacity',
          }}
        >
          {heart.symbol}
        </div>
      ))}

      <style>{`
        @keyframes fallingHeart {
          0% {
            transform: translate3d(0, -20px, 0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translate3d(0, 105vh, 0) rotate(360deg) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
