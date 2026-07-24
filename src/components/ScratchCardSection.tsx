import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Flower2 } from 'lucide-react';
import { triggerConfetti } from './ui/Confetti';

interface ScratchCardSectionProps {
  title: string;
  subtitle: string;
  scratchInstruction: string;
  revealedTitle: string;
  revealedMessage: string;
  actionText: string;
}

export const ScratchCardSection: React.FC<ScratchCardSectionProps> = ({
  title,
  subtitle,
  scratchInstruction,
  revealedTitle,
  revealedMessage,
  actionText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [scratchPercent, setScratchPercent] = useState<number>(0);
  const [isScratching, setIsScratching] = useState<boolean>(false);

  // Inisialisasi Canvas dengan pola perak/pink metalik
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Buat gradien metalik romantis
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#F7CAD0');
    gradient.addColorStop(0.3, '#E2C2FF');
    gradient.addColorStop(0.6, '#FBB1BD');
    gradient.addColorStop(1, '#FFB5A7');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Bintik-bintik kilau hiasan
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Teks instruksi gosok di tengah canvas
    ctx.fillStyle = '#6B2737';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(scratchInstruction, width / 2, height / 2);
  }, [scratchInstruction]);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const lastCheckRef = useRef<number>(0);

  // Hitung persentase area yang sudah tergosok
  const calculateScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = Math.round((transparentPixels / (pixels.length / 4)) * 100);
    setScratchPercent(percentage);

    // Jika sudah tergosok > 70% (hampir seluruhnya), baru otomatis buka seluruh kartu
    if (percentage > 70 && !isRevealed) {
      setIsRevealed(true);
      triggerConfetti();
    }
  }, [isRevealed]);

  // Throttle periksa persentase (maksimal 1x tiap 120ms) agar gosokan 60 FPS mulus
  const checkScratchThrottled = useCallback(() => {
    const now = Date.now();
    if (now - lastCheckRef.current > 120) {
      lastCheckRef.current = now;
      calculateScratchPercentage();
    }
  }, [calculateScratchPercentage]);

  // Menggosok posisi titik tertentu di canvas
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchThrottled();
  };

  // Handler Event Mouse & Touch
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    calculateScratchPercentage();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsScratching(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratching) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    calculateScratchPercentage();
  };

  return (
    <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 sm:p-10 relative overflow-hidden bg-gradient-to-b from-white/95 to-pastel-pink/40 border-2 border-white shadow-2xl rounded-3xl"
      >
        {/* Header Seksi */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-pink text-romantic-dark font-semibold text-sm mb-3">
          <Gift className="w-4 h-4 text-romantic-accent" />
          <span>Kejutan Tambahan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-romantic-dark mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto mb-8">
          {subtitle}
        </p>

        {/* CONTAINER KARTU GOSOK */}
        <div className="relative max-w-md mx-auto h-64 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-rose-50 via-white to-pink-100 flex flex-col items-center justify-center p-6 text-center select-none">

          {/* HADIAH TERSEMBUNYI (REVEALED CONTENT) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pastel-pink/90 via-white to-pastel-lavender/90 text-romantic-dark">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-3 shadow-inner"
            >
              <Flower2 className="w-9 h-9 text-romantic-accent" />
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold text-romantic-dark mb-2">
              {revealedTitle}
            </h3>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 font-medium px-2">
              {revealedMessage}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-romantic-accent to-rose-400 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg">
              <Heart className="w-4 h-4 fill-white" />
              <span>{actionText}</span>
            </div>
          </div>

          {/* LAYER KANVAS LAPISAN GOSOK (SCRATCH OVERLAY) */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                ref={containerRef}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                className="absolute inset-0 z-20 cursor-pointer touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <canvas ref={canvasRef} className="w-full h-full block rounded-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PETUNJUK STATUS GOSOK */}
        {!isRevealed ? (
          <p className="text-xs sm:text-sm text-gray-500 mt-4 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>Usapkan jari atau mousemu pada kartu di atas sayang! ({scratchPercent}%)</span>
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-romantic-accent font-semibold mt-4">
            🎉 Kartu Terbuka!💕
          </p>
        )}
      </motion.div>
    </section>
  );
};
