import React from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  songTitle: string;
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

// Komponen floating music controller mini yang elegan di pojok kanan bawah
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  songTitle,
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-white/80 backdrop-blur-md border border-pastel-pink shadow-xl rounded-full px-4 py-2 transition-all hover:bg-white sm:max-w-xs">
      {/* Ikon musik dengan animasi berputar ringan saat lagu berputar */}
      <div className={`p-2 rounded-full bg-pastel-pink text-romantic-accent flex-shrink-0 ${isPlaying && !isMuted ? 'animate-pulse' : ''}`}>
        <Music className="w-4 h-4" />
      </div>

      {/* Judul Lagu (running/truncated) */}
      <div className="hidden sm:flex flex-col text-left overflow-hidden mr-1">
        <span className="text-xs font-semibold text-romantic-dark truncate max-w-[130px]">
          {songTitle}
        </span>
        <span className="text-[10px] text-gray-500 font-medium">
          {isPlaying ? 'Sedang Diputar...' : 'Dijeda'}
        </span>
      </div>

      {/* Tombol Play / Pause */}
      <button
        onClick={onTogglePlay}
        className="p-2 rounded-full hover:bg-pastel-lavender/50 text-romantic-dark transition-colors active:scale-90"
        title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
      >
        {isPlaying ? <Pause className="w-4 h-4 text-romantic-accent" /> : <Play className="w-4 h-4 text-romantic-dark" />}
      </button>

      {/* Tombol Mute / Unmute */}
      <button
        onClick={onToggleMute}
        className="p-2 rounded-full hover:bg-pastel-lavender/50 text-romantic-dark transition-colors active:scale-90"
        title={isMuted ? "Bunyikan Musik" : "Bisukan Musik"}
        aria-label={isMuted ? "Bunyikan Musik" : "Bisukan Musik"}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-romantic-accent" />}
      </button>
    </div>
  );
};
