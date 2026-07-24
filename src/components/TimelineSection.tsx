import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import type { TimelineMoment } from '../data/content';

interface TimelineSectionProps {
  title: string;
  subtitle: string;
  moments: TimelineMoment[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  title,
  subtitle,
  moments,
}) => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Header Seksi */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 sm:mb-20"
      >
        <span className="text-romantic-accent font-semibold text-sm sm:text-base uppercase tracking-widest bg-pastel-pink/60 px-4 py-1.5 rounded-full inline-block mb-3">
          Kenangan Indah
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-romantic-dark mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      {/* Alur Timeline Vertikal */}
      <div className="relative">
        {/* Garis Tengah Timeline (Dekoratif) */}
        <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pastel-pink via-pastel-lavender to-pastel-peach rounded-full shadow-inner" />

        {/* Daftar Momen */}
        <div className="space-y-16 sm:space-y-24">
          {moments.map((moment, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Ikon Titik Tengah Timeline */}
                <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-pastel-pink shadow-lg flex items-center justify-center z-10">
                  <Heart className="w-4 h-4 text-romantic-accent fill-romantic-accent" />
                </div>

                {/* Bagian Konten Teks */}
                <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div className="glass-card p-6 sm:p-8 hover:shadow-2xl transition-shadow border border-white/80">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-lavender/60 text-purple-900 font-semibold text-xs sm:text-sm mb-3 ${isEven ? 'sm:ml-auto' : ''}`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{moment.yearOrDate}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-romantic-dark mb-3">
                      {moment.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {moment.description}
                    </p>
                  </div>
                </div>

                {/* Bagian Slot Foto Placeholder */}
                <div className="w-full sm:w-1/2 pl-12 sm:pl-0 flex justify-center">
                  <div className="group relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white w-full max-w-sm transform transition-all hover:scale-103 hover:shadow-2xl">
                    <img
                      src={moment.photoUrl}
                      alt={moment.title}
                      loading="lazy"
                      className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {moment.photoCaption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-center">
                        <span className="text-white text-xs sm:text-sm font-medium">
                          {moment.photoCaption}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
