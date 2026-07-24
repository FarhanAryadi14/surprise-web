import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Cake } from 'lucide-react';

interface ClosingSectionProps {
  title: string;
  message: string;
  reblowButtonText: string;
  backToTopButtonText: string;
  onReblowCandle: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  title,
  message,
  reblowButtonText,
  backToTopButtonText,
  onReblowCandle,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-24 px-4 sm:px-6 text-center bg-gradient-to-t from-pastel-pink/90 via-pastel-pink/40 to-transparent overflow-hidden">
      {/* Ornamen Kilauan Hati */}
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="p-4 rounded-full bg-white shadow-xl text-romantic-accent mb-6"
        >
          <Heart className="w-10 h-10 fill-romantic-accent" />
        </motion.div>

        {/* Judul & Pesan Penutup */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-romantic-dark mb-4 tracking-tight max-w-2xl">
          {title}
        </h2>
        <p className="text-gray-700 text-lg sm:text-2xl font-medium max-w-xl mx-auto mb-10 leading-relaxed">
          "{message}"
        </p>

        {/* Tombol Aksi Akhir (Tiup Ulang & Kembali ke Atas) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={onReblowCandle}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-romantic-accent to-pastel-rose text-white font-semibold rounded-full shadow-lg shadow-romantic-accent/30 hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Cake className="w-5 h-5" />
            <span>{reblowButtonText}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/90 hover:bg-white text-romantic-dark font-semibold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-white"
          >
            <ArrowUp className="w-5 h-5 text-romantic-accent" />
            <span>{backToTopButtonText}</span>
          </button>
        </div>

        {/* Copyright / Catatan Kecil */}
        <div className="mt-16 pt-8 border-t border-romantic-dark/10 text-xs sm:text-sm text-gray-500 font-medium">
          <p>Dibuat dengan sepenuh hati ❤️ untuk merayakan hari spesialmu.</p>
        </div>
      </div>
    </footer>
  );
};
