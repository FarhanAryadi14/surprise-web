import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, Sparkles } from 'lucide-react';
import type { GalleryPhoto } from '../data/content';

interface GallerySectionProps {
  title: string;
  subtitle: string;
  photos: GalleryPhoto[];
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  subtitle,
  photos,
  onSelectPhoto,
}) => {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header Seksi */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-romantic-accent font-semibold text-sm sm:text-base uppercase tracking-widest bg-pastel-pink/60 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Potret Spesial</span>
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-romantic-dark mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      {/* Grid Foto Responsif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
            onClick={() => onSelectPhoto(photo)}
            className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl bg-white border-4 border-white cursor-pointer transform transition-all hover:-translate-y-2"
          >
            {/* Gambar dengan Lazy Loading & Efek Zoom */}
            <div className="aspect-[4/5] w-full overflow-hidden relative">
              <img
                src={photo.url}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Overlay gelap saat hover + ikon perbesar */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full text-romantic-dark shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-6 h-6 text-romantic-accent" />
                </div>
              </div>

              {/* Caption Foto di Bawah */}
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-white font-medium text-sm sm:text-base line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
