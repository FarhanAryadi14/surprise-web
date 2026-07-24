import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, MicOff, PartyPopper, Heart } from 'lucide-react';
import { triggerConfetti } from './ui/Confetti';

interface InteractiveCakeProps {
  title: string;
  subtitle: string;
  manualBlowButtonText: string;
  micBlowButtonText: string;
  micInstruction: string;
  wishTitle: string;
  wishMessage: string;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({
  title,
  subtitle,
  manualBlowButtonText,
  micBlowButtonText,
  micInstruction,
  wishTitle,
  wishMessage,
}) => {
  const [isCandleLit, setIsCandleLit] = useState<boolean>(true);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [micStatusText, setMicStatusText] = useState<string>('');
  const [micVolume, setMicVolume] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Fungsi utama memadamkan lilin & memicu ledakan confetti
  const blowOutCandle = () => {
    if (!isCandleLit) return;
    setIsCandleLit(false);
    stopMicrophone();
    triggerConfetti();
  };

  // Fungsi reset untuk meniup lilin ulang
  const resetCandle = () => {
    setIsCandleLit(true);
    setMicStatusText('');
    setMicVolume(0);
  };

  // Menghentikan pendeteksian mikrofon
  const stopMicrophone = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsMicActive(false);
    setMicVolume(0);
  };

  // Mengaktifkan mikrofon (Web Audio API)
  const startMicrophone = async () => {
    if (isMicActive) {
      stopMicrophone();
      setMicStatusText('');
      return;
    }

    try {
      setMicStatusText('Meminta izin mikrofon...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsMicActive(true);
      setMicStatusText(micInstruction || '🎙️ Mikrofon aktif! Tiup langsung ke mikrofon HP/laptopmu...');

      // Cooldown 1 detik agar suara klik/pop saat mengaktifkan mic tidak memicu tiupan secara prematur
      const micStartTime = Date.now();

      // Loop deteksi volume nafas / tiupan
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const detectBlow = () => {
        if (!analyserRef.current || !isCandleLit) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Hanya periksa suara tiupan setelah 1 detik mikrofon siap
        if (Date.now() - micStartTime > 1000) {
          // Hitung rata-rata frekuensi rendah (karakteristik suara tiupan nafas)
          let sum = 0;
          const count = Math.min(25, dataArray.length);
          for (let i = 0; i < count; i++) {
            sum += dataArray[i];
          }
          const average = sum / count;

          // Visual indicator (0 - 100)
          setMicVolume(Math.min(100, Math.round((average / 80) * 100)));

          // Jika volume tiupan lebih dari threshold 80
          if (average > 80) {
            blowOutCandle();
            return;
          }
        }

        animationFrameRef.current = requestAnimationFrame(detectBlow);
      };

      detectBlow();
    } catch (err) {
      console.error("Gagal mengaktifkan mikrofon:", err);
      setIsMicActive(false);
      setMicStatusText('⚠️ Akses mikrofon tidak tersedia atau ditolak. Tidak apa-apa sayang, silakan klik tombol utama di atas ya!');
    }
  };

  // Bersihkan stream saat unmount
  useEffect(() => {
    return () => stopMicrophone();
  }, []);

  return (
    <section id="cake-section" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center scroll-mt-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="glass-card p-6 sm:p-12 relative overflow-hidden bg-gradient-to-b from-white/90 to-pastel-cream/80"
      >
        {/* Judul Seksi */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-pink text-romantic-dark font-semibold text-sm mb-4">
          <Sparkles className="w-4 h-4 text-romantic-accent" />
          <span>Kejutan Ulang Tahun</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-romantic-dark mb-4">
          {title}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          {subtitle}
        </p>

        {/* ILUSTRASI KUE ULANG TAHUN INTERAKTIF (SVG / CSS) */}
        <div className="relative w-64 h-72 sm:w-80 sm:h-80 mx-auto flex flex-col items-center justify-end my-8">
          {/* Cahaya di belakang kue saat lilin menyala */}
          <AnimatePresence>
            {isCandleLit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute top-8 w-48 h-48 rounded-full bg-pastel-gold/40 blur-3xl pointer-events-none animate-pulse-slow"
              />
            )}
          </AnimatePresence>

          {/* LILIN & API */}
          <div className="relative z-20 flex flex-col items-center mb-[-4px] cursor-pointer" onClick={blowOutCandle}>
            {/* Nyala Api (Flame) */}
            <AnimatePresence>
              {isCandleLit && (
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-7 h-11 mb-1 flex justify-center items-end"
                >
                  {/* Lingkaran luar api bercahaya */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-400 via-amber-300 to-yellow-100 rounded-full animate-flicker shadow-[0_0_20px_#FCE181]" />
                  {/* Inti putih api */}
                  <div className="w-3 h-6 bg-white rounded-full opacity-90 absolute bottom-1" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Asap tipis saat lilin padam */}
            {!isCandleLit && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.6, 0], y: -40, scale: [0.8, 1.5, 2] }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-4 h-8 bg-gray-400/50 rounded-full blur-sm mb-1"
              />
            )}

            {/* Batang Lilin */}
            <div className="w-5 h-16 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 rounded-t-md border border-pink-400/30 shadow-sm relative overflow-hidden">
              <div className="absolute top-3 w-full h-2 bg-white/60 -rotate-12" />
              <div className="absolute top-8 w-full h-2 bg-white/60 -rotate-12" />
            </div>
          </div>

          {/* LAYER 1 (ATAS) KUE */}
          <div className="relative z-10 w-44 sm:w-52 h-16 sm:h-20 bg-gradient-to-b from-pastel-pink to-pink-200 rounded-t-2xl border-x-2 border-t-2 border-pink-300 shadow-md flex items-start justify-around overflow-hidden">
            {/* Frosting/Lumeran Krim */}
            <div className="absolute -top-3 left-0 right-0 flex justify-between">
              <div className="w-10 h-8 bg-white rounded-b-full shadow-sm" />
              <div className="w-12 h-10 bg-white rounded-b-full shadow-sm" />
              <div className="w-8 h-7 bg-white rounded-b-full shadow-sm" />
              <div className="w-11 h-9 bg-white rounded-b-full shadow-sm" />
              <div className="w-10 h-8 bg-white rounded-b-full shadow-sm" />
            </div>
          </div>

          {/* LAYER 2 (TENGAH) KUE */}
          <div className="relative z-0 w-56 sm:w-64 h-20 sm:h-24 bg-gradient-to-b from-pastel-lavender to-purple-200 rounded-t-xl border-x-2 border-t-2 border-purple-300 shadow-lg flex items-center justify-around overflow-hidden -mt-2">
            <div className="absolute -top-3 left-0 right-0 flex justify-between">
              <div className="w-12 h-7 bg-pastel-pink rounded-b-full" />
              <div className="w-14 h-9 bg-pastel-pink rounded-b-full" />
              <div className="w-12 h-6 bg-pastel-pink rounded-b-full" />
              <div className="w-14 h-8 bg-pastel-pink rounded-b-full" />
              <div className="w-12 h-7 bg-pastel-pink rounded-b-full" />
            </div>
            <span className="text-xs sm:text-sm font-handwriting text-purple-800 font-bold tracking-wider opacity-80 mt-2">
              ♥ Happy Birthday ♥
            </span>
          </div>

          {/* LAYER 3 (BAWAH) KUE */}
          <div className="relative z-0 w-64 sm:w-76 h-22 sm:h-26 bg-gradient-to-b from-pastel-peach to-amber-100 rounded-t-xl rounded-b-2xl border-2 border-amber-200 shadow-xl flex items-center justify-around -mt-2">
            <div className="absolute -top-3 left-0 right-0 flex justify-between">
              <div className="w-14 h-8 bg-pastel-lavender rounded-b-full" />
              <div className="w-16 h-10 bg-pastel-lavender rounded-b-full" />
              <div className="w-14 h-7 bg-pastel-lavender rounded-b-full" />
              <div className="w-16 h-9 bg-pastel-lavender rounded-b-full" />
              <div className="w-14 h-8 bg-pastel-lavender rounded-b-full" />
            </div>
          </div>

          {/* PIRING KUE */}
          <div className="w-72 sm:w-88 h-5 bg-gradient-to-r from-gray-200 via-white to-gray-300 rounded-full border border-gray-300 shadow-2xl -mt-1" />
        </div>

        {/* KONTROL & TOMBOL TIUP LILIN */}
        {isCandleLit ? (
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto mt-6">
            {/* 1. TOMBOL UTAMA MANUAL (Paling Menonjol) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={blowOutCandle}
              className="w-full py-4 px-8 bg-gradient-to-r from-romantic-accent via-rose-400 to-pastel-rose text-white font-extrabold text-lg sm:text-xl rounded-2xl shadow-xl shadow-romantic-accent/40 hover:shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 cursor-pointer border border-white/40"
            >
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{manualBlowButtonText}</span>
              <Heart className="w-6 h-6 fill-white" />
            </motion.button>

            {/* 2. TOMBOL OPSIONAL MIKROFON (Bonus) */}
            <button
              onClick={startMicrophone}
              className={`w-full py-2.5 px-6 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                isMicActive
                  ? 'bg-rose-100 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-white/60 hover:bg-white border-pastel-purple text-gray-700'
              }`}
            >
              {isMicActive ? <MicOff className="w-4 h-4 text-rose-600" /> : <Mic className="w-4 h-4 text-purple-600" />}
              <span>{isMicActive ? "Matikan Sensor Mikrofon" : micBlowButtonText}</span>
            </button>

            {/* Status teks mikrofon jika aktif/gagal */}
            {micStatusText && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center gap-2"
              >
                <p className="text-xs sm:text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-lg shadow-sm border border-gray-100 max-w-sm">
                  {micStatusText}
                </p>

                {/* Meter Indikator Kekuatan Tiupan (Visual Feedback) */}
                {isMicActive && (
                  <div className="w-full max-w-xs bg-gray-200/80 rounded-full h-3 overflow-hidden border border-gray-300 p-0.5 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-teal-400 via-rose-400 to-romantic-accent h-full rounded-full transition-all duration-75"
                      style={{ width: `${micVolume}%` }}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          /* TAMPILAN SETELAH LILIN DIPADAMKAN (UCAPAN DAN TOMBOL ULANG) */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-pastel-pink/80 via-white to-pastel-lavender/60 rounded-3xl border-2 border-white shadow-xl max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-romantic-accent">
              <PartyPopper className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-romantic-dark mb-3">
              {wishTitle}
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 font-medium">
              "{wishMessage}"
            </p>
            <button
              onClick={resetCandle}
              className="px-6 py-2.5 bg-white/90 hover:bg-white text-romantic-accent font-semibold rounded-full shadow-md hover:shadow-lg transition-all text-sm border border-pastel-rose/40"
            >
              🔄 Nyalakan & Tiup Lilin Lagi
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
