import confetti from 'canvas-confetti';

// Fungsi helper untuk memicu ledakan confetti romantis (warna-warni pastel & hati/bintang jika mendukung)
export const triggerConfetti = () => {
  // Ledakan dari kiri
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0.1, y: 0.6 },
    colors: ['#FFB3C6', '#FFE5EC', '#E8DFF5', '#FCE181', '#FF8DA1'],
  });

  // Ledakan dari kanan
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 0.9, y: 0.6 },
    colors: ['#FFB3C6', '#FFE5EC', '#E8DFF5', '#FCE181', '#FF8DA1'],
  });

  // Ledakan tengah kembang api ringan
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FF6B8B', '#FFB3C6', '#FCE181', '#FFFFFF'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });
  }, 250);
};
