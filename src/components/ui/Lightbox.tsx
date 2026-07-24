import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { GalleryPhoto } from '../../data/content';

interface LightboxProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ photo, onClose }) => {
  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-zoom-out"
        >
          {/* Tombol Tutup */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 focus:outline-none"
            aria-label="Tutup foto"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Kontainer Gambar & Caption */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Supaya klik di foto tidak menutup lightbox
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center bg-white/10 p-2 sm:p-4 rounded-3xl border border-white/20 shadow-2xl overflow-hidden cursor-default"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="max-h-[72vh] w-auto object-contain rounded-2xl shadow-lg"
            />
            {photo.caption && (
              <p className="mt-4 text-white text-base sm:text-lg font-medium text-center px-4 py-1 bg-black/40 rounded-full backdrop-blur-sm">
                {photo.caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
