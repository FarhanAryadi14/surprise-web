import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';

interface HeroSectionProps {
  greeting: string;
  title: string;
  subtitle: string;
  scrollButtonText: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  greeting,
  title,
  subtitle,
  scrollButtonText,
}) => {
  // Animasi container untuk mengatur jeda antar huruf
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  // Animasi per-huruf untuk nama istri
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 bg-gradient-to-b from-pastel-pink/70 sm:from-pastel-pink via-pastel-lavender/50 to-pastel-cream overflow-hidden">
      {/* Floating Ornaments (Balon/Orb cahaya lembut) */}
      <div className="absolute top-1/4 left-10 sm:left-20 w-32 h-32 rounded-full bg-white/60 blur-2xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 sm:right-20 w-44 h-44 rounded-full bg-pastel-gold/40 blur-2xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Lencana kecil pembuka */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm text-romantic-accent font-semibold text-sm sm:text-base mb-6">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{greeting}</span>
          <Heart className="w-4 h-4 fill-romantic-accent" />
        </div>

        {/* Nama Istri (Besar di Tengah & Animasi Huruf per Huruf) */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-romantic-dark tracking-tight mb-6 sm:mb-8 flex flex-wrap justify-center gap-x-3 sm:gap-x-4"
        >
          {title.split(' ').map((word, wordIdx) => (
            <span key={wordIdx} className="inline-flex">
              {word.split('').map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={letterVariants}
                  className="inline-block hover:text-romantic-accent hover:scale-125 transition-transform cursor-default text-glow"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Subjudul & ucapan pembuka */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-gray-700 text-base sm:text-xl md:text-2xl font-normal leading-relaxed max-w-2xl px-2 sm:px-4"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Tombol Scroll ke Bawah dengan Animasi Bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#cake-section"
          className="group flex flex-col items-center gap-2 text-sm font-semibold text-romantic-dark/80 hover:text-romantic-accent transition-colors"
        >
          <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white group-hover:scale-105 transition-transform">
            {scrollButtonText}
          </span>
          <div className="p-2 rounded-full bg-white/80 shadow-md animate-bounce group-hover:bg-romantic-accent group-hover:text-white transition-colors">
            <ChevronDown className="w-5 h-5" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};
