import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onEnter: () => void;
}

// Layar pembuka (Welcome Overlay / Envelope) untuk menyambut istri sekaligus memperoleh user gesture agar musik bisa diputar
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  title,
  subtitle,
  buttonText,
  onEnter,
}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-peach text-center overflow-hidden"
    >
      {/* Ornamen latar belakang bercahaya */}
      <div className="absolute w-72 h-72 rounded-full bg-pastel-rose/30 blur-3xl animate-pulse-slow -top-10 -left-10" />
      <div className="absolute w-80 h-80 rounded-full bg-pastel-gold/40 blur-3xl animate-float bottom-10 right-10" />

      {/* Kartu Amplop Kejutan */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
        className="relative z-10 max-w-md w-full glass-card p-8 sm:p-10 border-2 border-white/80 shadow-2xl flex flex-col items-center"
      >
        {/* Ikon Hati dan Kilauan */}
        <div className="relative mb-6">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-romantic-accent to-pastel-rose flex items-center justify-center shadow-lg shadow-romantic-accent/30"
          >
            <Heart className="w-10 h-10 text-white fill-white" />
          </motion.div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pastel-gold animate-bounce" />
        </div>

        {/* Judul & Subjudul */}
        <h1 className="text-2xl sm:text-3xl font-bold text-romantic-dark mb-3 tracking-tight">
          {title}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
          {subtitle}
        </p>

        {/* Tombol Buka Kejutan */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-romantic-accent to-pastel-rose text-white font-semibold text-lg rounded-full shadow-lg shadow-romantic-accent/40 hover:shadow-xl hover:from-romantic-glow transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>{buttonText}</span>
          <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
