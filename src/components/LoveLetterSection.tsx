import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface LoveLetterSectionProps {
  title: string;
  salutation: string;
  paragraphs: string[];
  signature: string;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  title,
  salutation,
  paragraphs,
  signature,
}) => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative heart-pattern p-8 sm:p-14 md:p-16 rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden"
      >
        {/* Stempel Hati di Pojok Atas */}
        <div className="absolute top-6 right-6 w-16 h-16 rounded-full border-2 border-dashed border-rose-400/50 flex items-center justify-center rotate-12 opacity-80 pointer-events-none">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-300 animate-pulse" />
        </div>

        <div className="absolute top-6 left-6 opacity-60 pointer-events-none">
          <Sparkles className="w-6 h-6 text-pastel-gold" />
        </div>

        {/* Judul Seksi */}
        <div className="text-center mb-8 sm:mb-10 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
            Pesan Dari Hati
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-romantic-dark mt-3 tracking-tight">
            {title}
          </h2>
        </div>

        {/* Isi Surat Cinta (Kertas Kustom dengan Font Handwriting) */}
        <div className="relative z-10 bg-white/85 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-inner border border-pink-100 space-y-6 text-left">
          {/* Salam Pembuka */}
          <h3 className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-romantic-accent tracking-wide">
            {salutation}
          </h3>

          {/* Paragraf-paragraf Surat */}
          <div className="space-y-4 sm:space-y-6">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="font-handwriting text-xl sm:text-2xl md:text-3xl text-gray-800 leading-relaxed font-semibold tracking-wide sm:indent-8"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tanda Tangan */}
          <div className="pt-6 sm:pt-8 text-right border-t border-pink-100/80">
            <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-romantic-dark whitespace-pre-line tracking-wide">
              {signature}
            </p>
          </div>
        </div>

        {/* Ornamen Bawah */}
        <div className="mt-8 text-center flex justify-center items-center gap-2 text-rose-400 opacity-80">
          <span>~ ♥ ~ ♥ ~ ♥ ~</span>
        </div>
      </motion.div>
    </section>
  );
};
